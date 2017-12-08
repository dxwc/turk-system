let router = require('express').Router();
let db_func = require('../../db/functions');
let router_func = require('../functions');
let mongoose = require('mongoose');

router.get('/system_demand/:post_id', (req, res) =>
{
    let obj = {};
    if(router_func.logged_in(req)) obj = router_func.login_render_object(req);

    if(!mongoose.Types.ObjectId.isValid(req.params.post_id))
    {
        obj.top_info_text = 'Invalid post id';
        return res.render('system_demand', obj);
    }

    db_func.system_demand_post_info(req.params.post_id)
    .then((result) =>
    {
        obj.post_data = result;
        return db_func.get_user(result.client_id);
    })
    .then((result) =>
    {
        obj.client_data = result;
        res.render('system_demand', obj);
    })
    .catch((err) =>
    {
        console.log(err);
        obj.top_info_text = 'Error fetching demand info';
        res.render('system_demand', obj);
    });
});

module.exports = router;