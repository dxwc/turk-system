let router = require('express').Router();
let router_func = require('../functions');

let admin_password = router_func.admin_password;

router.get('/admin', (req, res) =>
{
    router_func.remove_additional_sessions_prop(req);

    if(req.session && req.session.admin_password === admin_password)
    {
        return res.render('admin', { title : 'Admin Panel', logged_in : true });
    }
    else
    {
        return res.render('admin', { title : 'Admin Panel', logged_in : false });
    }
});

router.post('/admin', (req, res) =>
{
    if
    (
        req.session === undefined
    )
        return res.status(500).end();
    if
    (
        req.body === undefined ||
        req.body.admin_password === undefined
    )
        return res.status(400).send('404 NOT FOUND');
    if
    (
        req.body.admin_password === admin_password ||
        req.session.admin_password === admin_password
    )
    {
        req.session.admin_password = admin_password;
        return res.render
        (
            'admin',
            {
                title : 'Admin Panel',
                logged_in : true,
            }
        );
    }
    else
    {
        return res.render
        (
            'admin',
            {
                title : 'Admin Panel',
                logged_in : false,
                admin_login_error : 'Invalid super user access code'
            }
        );
    }
})

module.exports = router;