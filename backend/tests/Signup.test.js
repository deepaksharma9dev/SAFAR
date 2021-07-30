const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const User = require('../models/User');
// const Jwt = require('jsonwebtoken');

const { connect, closeDatabase, clearDatabase } = require('../Config/InMemorydb');
const { createUser, findUser } = require('../controller/User');
const { createAdmin } = require('../controller/Admin');

const SampleUser = {
    name: "deepak",
    email: 'deepak19@navgurukul.org',
    password: '123456'
};


const SamplePayload = {};


describe('user should created if it is not exists', () => {
    beforeAll(async() => await connect());
    afterAll(async() => await closeDatabase());


    it('it should give response Ok', async() => {
        const res = await request.post('/api/users/user/signup')
            .send({
                "name": "sonu",
                "email": "sonu19@navgurukul.org",
                "password": "123456",
                "confirm_password": "123456"
            });
        // console.log(res);

        // console.log(res.statusCode);
        expect(res.statusCode).toBe(200);
    });


    it('it should gives response 200 and res.json should be called once', async() => {
        const next = jest.fn();
        const mockResponse = () => {
            const res = {};
            /*
            res = {

                status()=> res
                json()=>res
            
            }
             */
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
        //making a mock of the request object

        const req = {
            body: {
                name: "Deepak",
                email: "deepak19@navgurukul.org",
                password: "123456"
            }
        };

        const res = mockResponse();
        // const next = nextfunc();
        await createUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json.mock.calls.length).toBe(1);
        expect(next.mock.calls.length).toBe(0);
        // console.log(next.mock.calls.length, "next 1");

    });

    it('if user gives an entered email so next should an error', async() => {
        const next = jest.fn();

        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        //making a mock of the request object

        const req = {
            body: {
                name: "Deepak",
                email: "deepak19@navgurukul.org",
                password: "123456"
            }
        };

        const res = mockResponse();
        await createUser(req, res, next);
        expect(next.mock.calls[0][0].status).toBe(400);

    });


    it('returns user details if exists', async() => {
        const email = "deepak19@navgurukul.org";
        const user = await User.findOne({ email });
        expect(user.email).toEqual(email);
    });
});



describe('Admin sign up and controller functions', () => {
    jest.setTimeout(6000);
    beforeAll(async() => await connect());
    afterAll(async() => await closeDatabase());
    it("it should return response 200", async() => {
        const res = await request.post('/api/admins/admin/signup')
            .send({
                "admin_email": "kartik@navgurukul.org",
                "name": "sonu",
                "email": "kartik19@navgurukul.org",
                "password": "123456",
                "confirm_password": "123456"
            });
        expect(res.statusCode).toBe(200);
    });

    it('should create an admin', async() => {
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        const req = {
            body: {
                name: "deepak",
                email: "deepak19@navgurukul.org",
                password: "123456"
            }
        };


        const res = mockResponse();
        await createAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json.mock.calls.length).toBe(1);

    });

    it("it should finds and return an object of an admin", async() => {
        const email = "deepak19@navgurukul.org";
        const user = await User.findOne({ email });
        expect(user.isAdmin).toBeTruthy();

    });
});