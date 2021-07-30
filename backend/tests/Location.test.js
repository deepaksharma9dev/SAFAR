const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const { connect, closeDatabase, clearDatabase } = require('../Config/InMemorydb');
const { logInAdmin, createAdmin } = require('../controller/Admin');
const { AddLocation } = require('../controller/Locations');
const User = require('../models/User');

describe('Locations and related functions', () => {

    beforeAll(async() => await connect());
    afterAll(async() => await closeDatabase());
    beforeEach(async() => await clearDatabase());

    it('it shoud give 200 response', async() => {
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
        // console.log(token);

        const response = await request
            .post('/api/admins/admin/location')
            .set('Content-type', 'application/json')
            .set('authorization', `${token}`)
            .send({
                "city": "Ayodhya",
                "state": "Uttar Pradesh"
            });
        expect(response.statusCode).toBe(200);
    });

    it('if city exists next should called with an error otherwise it will create an location', async() => {
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
            "city": "Ayodhya",
            "state": "Uttar Pradesh"
        };

        await AddLocation(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: "location has added successfully" });

        //again a call with same fields so next will call an error
        await AddLocation(req, res, next);

        expect(next).toHaveBeenCalledWith({
            status: 400,
            errors: "Location is already exists"
        });
    });
});