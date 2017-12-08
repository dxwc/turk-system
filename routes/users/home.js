let router = require('express').Router();
let router_func = require('../functions');

router.get('/', (req, res) =>
{
    if(router_func.logged_in(req))
    {
        let obj = router_func.login_render_object(req, 'Home');

        res.render('home', obj);
    }
    else // not logged in
    {
        let login_error_text = req.session.login_error_text;
        let apply_error_text = req.session.apply_error_text;

        delete req.session.login_error_text;
        delete req.session.apply_error_text;

        res.render
        (
            'home',
            {
                title : 'Home',
                logged_in : false,
                apply_error_text : apply_error_text,
                apply_user_name : req.session.apply_user_name,
                apply_deposit_amount : req.session.apply_deposit_amount,
                apply_role : req.session.apply_role,
                login_error_text : login_error_text,
                top_info_text : req.session.top_info_text
            }
        );
    }
});

module.exports = router;