const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const { connect, closeDatabase, clearDatabase } = require('../Config/InMemorydb');
const { AddLocation } = require('../controller/Locations');
const User = require('../models/User');
const { createStaff } = require('../controller/Staff');
const { addBus } = require('../controller/Bus');
const { addAgency } = require('../controller/Agency');
const { logInAdmin, createAdmin } = require('../controller/Admin');
const busModel = require('../models/Bus');
const { bookTicket } = require('../controller/User');
const ticketModel = require('../models/Ticket');

describe('Book tickets and related functions', () => {


    beforeAll(async() => await connect());
    beforeAll(async() => await clearDatabase());
    afterAll(async() => await closeDatabase());

    // afterAll(async() => await clearDatabase());


    it('book ticket api should give response 200', async() => {
        jest.setTimeout(6000);


        const next = jest.fn();
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
        const req = {
            body: {
                "name": "sonu",
                "email": "sonu19@navgurukul.org",
                "password": "123456"
            }
        };

        const res = mockResponse();

        await createAdmin(req, res, next);
        await logInAdmin(req, res, next);

        const token = res.json.mock.calls[0][0].token;

        req.body = {
            "name": "sonu",
            "phone": 9895856578,
            "address": "Delhi",
            "isDriver": true
        };

        const Admin = await User.findOne({ email: "sonu19@navgurukul.org" });

        req.user = Admin.id;

        await createStaff(req, res, next);


        req.body = {
            "city": "Ayodhya",
            "state": "Uttar Pradesh"
        };

        await AddLocation(req, res, next);
        // console.log(res.json.mock.calls, "location");
        req.body = {
            "city": "Dharamshala",
            "state": "himachal pradesh"
        };
        await AddLocation(req, res, next);
        // console.log(res.json.mock.calls, "location");


        req.body = {
            "phone": 9891392748,
            "agencyName": "kalyani trevals",
            "headOfficeLocation": "Delhi"
        };

        await addAgency(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({ msg: "Agency has added successfully" });

        req.body = {
            "busName": "kalyani trevals",
            "vehicleNo": "DL-ML654k88",
            "seats": 5,
            "busType": "NonAc",
            "seatCategory": "sleeper",
            "policy": "test",
            "image": ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80",
                "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
            ],
            "Staff_Number": [9895856578],
            "from": "Ayodhya",
            "to": "Dharamshala",
            "arrivalTime": "4:00 AM",
            "departureTime": "5:00 PM",
            "schedule": [0, 3, 6]
        };
        //testing adding a new bus
        await addBus(req, res, next);

        const bus = await busModel.findOne({ busName: "kalyani trevals" }).select('id');
        console.log(bus.id, "msg");


        const response = await request
            .post(`/api/users/user/buses/${bus.id}/bookticket`)
            .set('Content-type', 'application/json')
            .set('authorization', `${ token }`)
            .send({
                "seats": ["1A", "1B", "1C"],
                "passengers": [{
                        "seat_no": "",
                        "name": "Deepak",
                        "gender": "male",
                        "age": 22
                    },
                    {
                        "seat_no": "",
                        "name": "Kartik",
                        "gender": "male",
                        "age": 21
                    },
                    {
                        "seat_no": "",
                        "name": "Sonu",
                        "gender": "male",
                        "age": 18
                    }
                ],
                "contactNo": 9911571971,
                "journeyDate": "2021-12-12"
            });
        // console.log(response, "fghjk");
        expect(response.statusCode).toBe(200);
    });
    it('it should give invalid object id error', async() => {
        jest.setTimeout(6000);
        const next = jest.fn();
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
        const req = {
            body: {
                "name": "sonu",
                "email": "sonu19@navgurukul.org",
                "password": "123456"
            }
        };
        const res = mockResponse();
        await logInAdmin(req, res, next);

        const token = res.json.mock.calls[0][0].token;

        const bus = {
            id: "aaaaa"
        };

        const response = await request
            .post(`/api/users/user/buses/${bus.id}/bookticket`)
            .set('Content-type', 'application/json')
            .set('authorization', `${ token }`)
            .send({
                "seats": ["1A", "1B", "1C"],
                "passengers": [{
                        "seat_no": "",
                        "name": "Deepak",
                        "gender": "male",
                        "age": 22
                    },
                    {
                        "seat_no": "",
                        "name": "Kartik",
                        "gender": "male",
                        "age": 21
                    },
                    {
                        "seat_no": "",
                        "name": "Sonu",
                        "gender": "male",
                        "age": 18
                    }
                ],
                "contactNo": 9911571971,
                "journeyDate": "2021-12-12"
            });
        expect(response.statusCode).toBe(400);
    });

    it('books a ticket and give successful response', async() => {
        const next = jest.fn();
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        const res = mockResponse();
        let req = {
            body: {
                "name": "sonu",
                "email": "sonu19@navgurukul.org",
                "password": "123456"
            }
        };

        await logInAdmin(req, res, next);
        const user = await User.findOne({ email: "sonu19@navgurukul.org" });
        req = {
            body: {
                "seats": ["1D", "2A", "2B"],
                "passengers": [{
                        "seat_no": "",
                        "name": "Deepak",
                        "gender": "male",
                        "age": 22
                    },
                    {
                        "seat_no": "",
                        "name": "Kartik",
                        "gender": "male",
                        "age": 21
                    },
                    {
                        "seat_no": "",
                        "name": "Sonu",
                        "gender": "male",
                        "age": 18
                    }
                ],
                "contactNo": 9911571971,
                "journeyDate": "2021-12-12"
            }
        };

        const bus = await busModel.findOne({ busName: "kalyani trevals" }).select('id');
        req.params = { busId: bus.id };
        req.user = user.id;


        await bookTicket(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            "msg": "your ticket has booked successfully"
        });
        const ticket = await ticketModel.findOne({ busId: req.params.busId, userId: req.user });

        console.log(ticket, ":ticket");


        // console.log(ticket, "fghj");
    });

    it('if passengers and seats are not equal is should call next with an error', async() => {
        const next = jest.fn();
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
        const res = mockResponse();
        const req = {
            body: {
                "seats": ["1A", "1B", "1C", "1D"],
                "passengers": [{
                        "seat_no": "",
                        "name": "Deepak",
                        "gender": "male",
                        "age": 22
                    },
                    {
                        "seat_no": "",
                        "name": "Kartik",
                        "gender": "male",
                        "age": 21
                    },
                    {
                        "seat_no": "",
                        "name": "Sonu",
                        "gender": "male",
                        "age": 18
                    }
                ],
                "contactNo": 9911571971,
                "journeyDate": "2021-12-12"
            }
        };

        const bus = await busModel.findOne({ busName: "kalyani trevals" }).select('id');
        req.params = { busId: bus.id };

        await bookTicket(req, res, next);
        expect(next).toHaveBeenCalledWith({
            status: 400,
            errors: "Invalid Input"
        });

    });

    it('if seats are already booked so it should call next', async() => {
        const next = jest.fn();
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
        const res = mockResponse();
        let req = {
            body: {
                "name": "sonu",
                "email": "sonu19@navgurukul.org",
                "password": "123456"
            }
        };

        await logInAdmin(req, res, next);

        req = {
            body: {
                "seats": ["1A", "1B", "1C"],
                "passengers": [{
                        "seat_no": "",
                        "name": "Deepak",
                        "gender": "male",
                        "age": 22
                    },
                    {
                        "seat_no": "",
                        "name": "Kartik",
                        "gender": "male",
                        "age": 21
                    },
                    {
                        "seat_no": "",
                        "name": "Sonu",
                        "gender": "male",
                        "age": 18
                    }
                ],
                "contactNo": 9911571971,
                "journeyDate": "2021-12-12"
            }
        };

        const bus = await busModel.findOne({ busName: "kalyani trevals" }).select('id');
        req.params = { busId: bus.id };

        const user = await User.findOne({ email: "sonu19@navgurukul.org" });

        req.user = user.id;

        const ticket = await ticketModel.findOne({ busId: req.params.busId, userId: req.user });



        await bookTicket(req, res, next);
        expect(next).toHaveBeenCalled();

    });

});