let router = require('express').Router();
let router_func = require('../functions');
let db_func = require('../../db/functions');

let admin_password = router_func.admin_password;

router.get('/view_quit_demands', (req, res) =>
{
    if(!router_func.admin_logged_in(req))
        return res.status(404).send('404 NOT FOUND');

    db_func.get_quit_demands()
    .then((demands) =>
    {
        let top_info_text = req.session.top_info_text;
        delete req.session.top_info_text;

        res.render
        (
            'view_quit_demands',
            {
                logged_in : true,
                demands : demands,
                top_info_text : top_info_text
            }
        )
    });
});

module.exports = router;