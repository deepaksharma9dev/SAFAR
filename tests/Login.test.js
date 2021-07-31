const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const User = require('../models/User');
const { createUser, loginUser } = require('../controller/User');
const { logInAdmin, createAdmin } = require('../controller/Admin');
const { connect, closeDatabase, clearDatabase } = require('../Config/InMemorydb');


describe('Admin Log  Api and helper functions', () => {
    beforeAll(async() => await connect());
    afterAll(async() => await closeDatabase());
    beforeEach(async() => await clearDatabase());

    it('if admin log in then it should gives status 200 and res.json should call', async() => {
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

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json.mock.calls.length).toBe(1);
        expect(next.mock.calls.length).toBe(0);
        await logInAdmin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json.mock.calls.length).toBe(2);
        expect(next.mock.calls.length).toBe(0);

    });
    it('if email does not exists it should call next with 404', async() => {

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
        expect(next.mock.calls[0][0].status).toEqual(404);


    });

    it('if entered password was correct it should give me same password otherwise next should call', async() => {
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
        expect(res.status).toHaveBeenCalledWith(200);

        // console.log(res.json.mock.calls, "calls");
        expect(res.json).toHaveBeenCalled();


        const user = await User.findOne({
            email: req.body.email
        });

        // console.log(user, "user exists");
        req.body.password = "1234566";
        await logInAdmin(req, res, next);
        expect(next).toHaveBeenCalled();

    });

});


describe('Log in Api call and helper functions', () => {
    beforeAll(async() => await connect());
    afterAll(async() => await closeDatabase());
    beforeEach(async() => await clearDatabase());
    it('log in api should return 200 response', async() => {
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
        let res = mockResponse();

        await createUser(req, res);
        const response = await request.post('/api/users/user/login')
            .send({
                "name": "sonu",
                "email": "sonu19@navgurukul.org",
                "password": "123456"
            });
        expect(response.statusCode).toBe(200);
    });


    it('if email does not exists it should call next with 404', async() => {
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

        let res = mockResponse();
        await createUser(req, res, next);
        await loginUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();

        req.body.email = "sonu10@navgurukul.org";
        await loginUser(req, res, next);
        expect(next).toHaveBeenCalled();

    });

    it('user should not login with wrong password', async() => {
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

        let res = mockResponse();
        await createUser(req, res, next);
        req.body.password = "1234566";
        await loginUser(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});