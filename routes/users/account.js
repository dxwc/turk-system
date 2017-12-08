let router = require('express').Router();
let router_func = require('../functions');

router.get('/account', (req, res) =>
{
    if(req.session === undefined)
        return res.status(500).end();
    if(!router_func.logged_in(req))
        return res.status(404).send('404 NOT FOUND');

    let obj = router_func.login_render_object(req, 'Account');

    if(req.session.quit_demand_error !== undefined)
        obj.quit_demand_error = req.session.quit_demand_error;
    if(req.session.quit_demand_sent !== undefined)
        obj.quit_demand_sent = req.session.quit_demand_sent;

    res.render('account', obj);
});

module.exports = router;