let router = require('express').Router();
let db_func = require('../../db/functions');
let router_func = require('../functions');

router.get('/browse_system_demands', (req, res) =>
{
    let obj = {};
    if(router_func.logged_in(req)) obj = router_func.login_render_object(req);
    db_func.get_system_demands()
    .then((result) =>
    {
        console.log(result[0].timeline);
        obj.data = result;
        res.render('browse_system_demands', obj);
    });
});

module.exports = router;