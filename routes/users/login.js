let router = require('express').Router();
let router_func = require('../functions');
let db_func = require('../../db/functions');

router.post('/login', (req, res) =>
{
    if(router_func.logged_in(req)) return res.redirect(301, '/');
    if(req.session === undefined) return res.status(500).end();

    if
    (
        req.body &&
        req.body.user_name &&
        req.body.password
    )
    {
        db_func.query_users(req.body.user_name, req.body.password)
        .then((result) =>
        {
            router_func.remove_additional_sessions_prop(req);
            router_func.log_user_in(req, result);
            res.redirect(301, '/');
        })
        .catch((err) =>
        {
            router_func.remove_additional_sessions_prop(req);

            if
            (
                (err && (err.errCode === undefined || err.errCode === 3)) ||
                err === undefined
            )
            {
                req.session.login_error_text =
                'Unknown error[0] occured. Contact super user';
            }
            else if(err.errCode === 0 || err.errCode == 2)
            {
                req.session.login_error_text =
                'The username and password combination does not match any in database';
            }
            else if(err.errCode == 1 && err.data) // in blacklist
            {
                req.session.login_error_text =
                'Your account has been blacklisted until ' + err.data.expires + '. ' +
                'For reason: ' + err.data.reason;
            }
            else
            {
                req.session.login_error_text =
                'Unknown error[1] occured. Contact super user';
            }

            res.redirect(301, '/');
        });
    }
})

module.exports = router;