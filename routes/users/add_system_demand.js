let router = require('express').Router();
let db_func = require('../../db/functions');
let router_func = require('../functions');

router.get('/add_system_demand', (req, res) =>
{
    if(req.session === undefined)
        return res.status(500).end();
    if
    (
        !router_func.logged_in(req) ||
        req.session.role !== true ||
        req.session.access_type !== true
    )
        return res.status(404).send('404 NOT FOUND');

    let obj = router_func.login_render_object(req);

    res.render('add_system_demand', obj);
});

router.post('/add_system_demand', (req, res) =>
{
    if(req.session === undefined || req.session.user_id === undefined)
        return res.status(500).end();
    if
    (
        !router_func.logged_in(req) ||
        req.session.role !== true ||
        req.session.access_type !== true
    )
        return res.status(404).send('404 NOT FOUND');

    let descriptions;
    let deadlines;

    if(typeof(req.body.description) === 'string')
    {
        descriptions = [req.body.description];
        deadlines = [req.body.deadline];
    }
    else
    {
        descriptions = req.body.description;
        deadlines = req.body.deadline;
    }

    db_func.add_system_demand
    (
        req.session.user_id,
        req.body.system_spec,
        descriptions,
        deadlines
    )
    .then((result) =>
    {
        res.redirect(301, '/system_demand/' + result.post_id);
    })
    .catch((err) =>
    {
        console.log(err);
        res.send('there was an error adding system demand');
    });

});

module.exports = router;