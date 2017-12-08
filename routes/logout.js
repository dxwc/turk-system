let router = require('express').Router();
let router_func = require('./functions');

router.post('/logout', (req, res) =>
{
    if(req.session === undefined)
        return res.status(500).end();
    if
    (
        !router_func.logged_in(req) &&
        !router_func.admin_logged_in(req)
    )
    {
        return res.status('404').end();
    }
    else
    {
        router_func.remove_additional_sessions_prop(req);
        router_func.logout(req, () => res.redirect(301, '/'));
    }

});

module.exports = router;