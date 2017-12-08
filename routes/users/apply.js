let router = require('express').Router();
let assert = require('assert');
let mongoose = require('mongoose');
let db_func = require('../../db/functions');
let router_func = require('../functions');

router.post('/apply', (req, res) =>
{
    if(router_func.logged_in(req)) return res.redirect(301, '/');
    if(req.session === undefined) return res.status(500).end();

    if
    (
        req.body &&
        req.body.user_name &&
        req.body.password_1 &&
        req.body.password_2 &&
        req.body.role &&
        req.body.deposit_amount
    )
    {
        let user_name = req.body.user_name;
        let password_1 = req.body.password_1;
        let password_2 = req.body.password_2;
        let role = req.body.role;
        let deposit_amount = req.body.deposit_amount;

        let caught = false;
        try
        {
            user_name = user_name.toLowerCase();
            assert(user_name.length >= 3, 'User name length not >= 3');
            let alpha = 'abcdefghijklmnopqrstuvwxyz';
            let alpha_numeric = 'abcdefghijklmnopqrstuvwxyz1234567890_';
            assert(
                alpha.indexOf(user_name[0]) !== -1,
                'User name doesn\'t start with a letter');
            for(let i = 0; i < user_name.length; ++i)
                assert(
                    alpha_numeric.indexOf(user_name[i]) !== -1,
                    'Username contains invlid character');

            assert(password_1.length >= 5, 'Password length invalid');
            assert(password_2.length >= 5, 'Password length invalid');
            assert(password_1 === password_2, 'Passwords don\'t match');

            assert(role === 'developer' || role === 'client', 'Invalid role');

            deposit_amount = Number.parseFloat(deposit_amount);
            assert(deposit_amount >= 10, 'Deposit amount not >= 10');
        }
        catch(err)
        {
            caught = true;

            apply_error_text = 'Invalid input';

            if(typeof err.message === 'string')
                apply_error_text += '. ' + err.message;

            req.session.apply_user_name = req.body.user_name;
            req.session.apply_deposit_amount = req.body.deposit_amount;
            req.session.apply_role = req.body.role;

            req.session.apply_error_text = apply_error_text;
            return res.redirect(301, '/');
        }

        db_func.add_user
        (
            user_name,
            password_1,
            role === 'developer' ? false : true,
            deposit_amount
        )
        .then((user_id) =>
        {
            if(typeof(user_id) === 'object')
            {
                router_func.remove_additional_sessions_prop(req);

                req.session.top_info_text =
                'Your application has been submitted.'
                + ' Ensure you pay the specified amount + 5 % for'
                + ' specified amount to be added on your account'
                + ' for use. Your account will be reviewed by super'
                + ' user, once accepted, you will be able to login to'
                + ' your full account (you can still login but you will'
                + ' be using a temporary account) .';

                res.redirect(301, '/');
            }
            else
            {
                res.status(500).send('Server error, contact super user');
            }
        })
        .catch((err) =>
        {
            console.log('Error:\n', err);
            if(err.func_error === true)
            {
                req.session.apply_error_text = err.text;
                res.redirect(301, '/');
            }
            else
            {
                req.session.apply_error_text =
                'Unknown error occured. Contact super user';
                res.redirect(301, '/');
            }
        });
    }
    else
    {
        res.redirect(301, '/');
    }
})

module.exports = router;