let router = require('express').Router();
let db_func = require('../../db/functions');
let router_func = require('../functions');

router.post('/quit_demand', (req, res) =>
{
    if(req.session === undefined)
        return res.status(500).end();
    if(!router_func.logged_in(req))
        return res.status(404).send('404 NOT FOUND');

    db_func.record_a_quit_demand
    (
        req.session.user_id,
        req.body.quit_details ? req.body.quit_details : undefined
    )
    .then((result) =>
    {
        req.session.quit_demand_sent = true;
        res.redirect(301, '/account');
    })
    .catch((err) =>
    {
        if(err.code === 11000)
        {
            req.session.quit_demand_error =
        'You have already sent a quit demand recently, super user will look at that';
        }
        else
        {
            req.session.quit_demand_error =
            'Unknown error saving recording quit demand. Contact super user';
        }

        res.redirect(301, '/account');
    })
});

module.exports = router;