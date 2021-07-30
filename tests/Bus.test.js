const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const { connect, closeDatabase, clearDatabase } = require('../Config/InMemorydb');
const { logInAdmin, createAdmin } = require('../controller/Admin');
const { AddLocation } = require('../controller/Locations');
const User = require('../models/User');
const { createStaff } = require('../controller/Staff');
const { addBus } = require('../controller/Bus');
const { addAgency } = require('../controller/Agency');


describe('create bus api and related functions', () => {

    jest.setTimeout(6000);
    beforeAll(async() => await connect());
    afterAll(async() => await closeDatabase());
    beforeEach(async() => await clearDatabase());
    it('should get response 200', async() => {

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



        // console.log(token);

        const response = await request
            .post('/api/admins/admin/addbus')
            .set('Content-type', 'application/json')
            .set('authorization', `${token}`)
            .send({
                "busName": "kalyani trevals",
                "vehicleNo": "DL-ML654k87",
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
            });
        expect(response.statusCode).toBe(200);
    });

    it('add bus and related functions', async() => {
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

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: "bus has created successfully" });

        await addBus(req, res, next);
        expect(next).toHaveBeenCalledWith({ status: 400, errors: 'bus already exists' });

        req.body.Staff_Number[0] = 9895856579;
        req.body.vehicleNo = "DL-ML654k89";
        // console.log(req.body);

        //calling same function different staff number will give error because it does not Exists

        await addBus(req, res, next);

        expect(next).toHaveBeenCalledWith({
            status: 400,
            errors: 'Numbers are invalid or staff does not exists'
        });

        // calling with same location(from)will accur an error

        req.body.from = "Dharamshala";
        req.body.Staff_Number[0] = 9895856578;

        await addBus(req, res, next);
        expect(next).toHaveBeenCalledWith({
            status: 400,
            errors: "Both locations be Same"
        });

        //creating a bus with invalid busName will accur an error
        req.body.from = "Ayodhya";
        req.body.busName = "Ram Dalal Travels";
        await addBus(req, res, next);

        expect(next).toHaveBeenCalledWith({
            status: 400,
            errors: "agency does not exists"
        });
    });
});