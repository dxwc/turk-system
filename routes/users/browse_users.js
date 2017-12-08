let router = require('express').Router();
let db_func = require('../../db/functions');
let router_func = require('../functions');

router.get('/browse_users', (req, res) =>
{
    let obj = {};
    if(router_func.logged_in(req)) obj = router_func.login_render_object(req);
    db_func.get_all_active_users()
    .then((result) =>
    {
        obj.data = result;
        res.render('browse_users', obj);
    });
});

module.exports = router;