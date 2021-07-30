const verifier = new(require("email-verifier"))("at_rE3O6IXGboYgzakEYdISGO6CZkrII");

const emailVerifier = (req, res, next) => {
    verifier.verify(req.body.email, (err, data) => {
        if (err) {
            // console.error(err);
            return res
                .status(500)
                .send({
                    message: 'Internal error'
                });
        }
        if (data.formatCheck === 'true' &&
            data.disposableCheck === 'false' &&
            data.dnsCheck === 'true' &&
            data.smtpCheck !== 'false'
        ) {
            return next();
        }
        return next({
            status: 400,
            errors: 'Invalid or disposable email.'
        });
    });
};




module.exports = { emailVerifier };