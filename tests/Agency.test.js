const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const { connect, closeDatabase, clearDatabase } = require('../Config/InMemorydb');
const { logInAdmin, createAdmin } = require('../controller/Admin');
const User = require('../models/User');
const { addAgency } = require('../controller/Agency');



describe('Agency Api call and other helper functions', () => {
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
            .post('/api/admins/admin/agency')
            .set('Content-type', 'application/json')
            .set('authorization', `${token}`)
            .send({
                "phone": 9891392748,
                "agencyName": "kalyani trevals",
                "headOfficeLocation": "Delhi"
            });
        expect(response.statusCode).toBe(200);
    });

    it('must call next with an error with Agency exists otherwise it should create an agency', async() => {

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


        const Admin = await User.findOne({ email: "sonu19@navgurukul.org" });

        req.user = Admin.id;

        req.body = {
            "phone": 9891392748,
            "agencyName": "kalyani trevals",
            "headOfficeLocation": "Delhi"
        };

        await addAgency(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({ msg: "Agency has added successfully" });

        //calling add agency with same agenyName

        await addAgency(req, res, next);
        expect(next).toHaveBeenCalledWith({
            status: 400,
            errors: "Agency already exists"
        });
    });
});