const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const { connect, closeDatabase, clearDatabase } = require('../Config/InMemorydb');
const { logInAdmin, createAdmin } = require('../controller/Admin');
const { createStaff } = require('../controller/Staff');
const User = require('../models/User');




describe('staff api call and other related functions', () => {
    beforeAll(async() => await connect());
    afterAll(async() => await closeDatabase());
    beforeEach(async() => await clearDatabase());

    it('staff Api Call it should return response 200 if logger is an admin', async() => {
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

        // creating an Admin for login to be called

        await createAdmin(req, res, next);
        await logInAdmin(req, res, next);

        const token = res.json.mock.calls[0][0].token;
        // console.log(token);

        const response = await request
            .post('/api/admins/admin/staff')
            .set('Content-type', 'application/json')
            .set('authorization', `${token}`)
            .send({
                "name": "sonu",
                "phone": "sonu19@navgurukul.org",
                "address": "Delhi",
                "isDriver": true
            });
        expect(response.statusCode).toBe(200);
    });


    it('if input is not valid or staff exists it will call next with an error otherwise it will create staff', async() => {

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
            "phone": 9897949596,
            "address": "Delhi",
            "isDriver": true
        };

        const Admin = await User.findOne({ email: "sonu19@navgurukul.org" });

        req.user = Admin.id;

        await createStaff(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'staff has added successfully'
        });

        ////again  creating for testing with wrong input 
        req.body.isDriver = "Sonu";
        req.body.phone = 9795989990;

        await createStaff(req, res, next);

        expect(next).toHaveBeenCalledWith({
            status: 400,
            errors: "Invalid input"
        });


        // again calling with same credatials


        req.body.isDriver = true;
        req.body.phone = 9897949596;

        await createStaff(req, res, next);
        expect(next).toHaveBeenCalledWith({
            status: 400,
            errors: "staff already exists"
        });
    });

});