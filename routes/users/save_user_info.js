let router = require('express').Router();
let db_func = require('../../db/functions');
let router_func = require('../functions');

router.post('/save_user_info', (req, res) =>
{
    if(req.session === undefined)   return res.status(500).end();
    if(!router_func.logged_in(req)) return res.status(404).send('404 NOT FOUND');

    if(req.session.role)
    {
        db_func.save_client_info(
            req.session.user_id, req.body.interest, req.body.cred, req.body.pic)
        .then((result) =>
        {
            return db_func.not_first_use(result.user_id);
        })
        .then(() =>
        {
            res.redirect(301, '/');
        })
        .catch(() =>
        {
            console.log('Error:\n', err);
            req.session.top_info_text = 'There was an error submitting profile info';
            res.redirect(301, '/');
        });
    }
    else
    {
        db_func.save_developer_info(
            req.session.user_id, req.body.interest, req.body.cred, req.body.pic)
        .then((result) =>
        {
            return db_func.not_first_use(result.user_id);
        })
        .then(() =>
        {
            res.redirect(301, '/');
        })
        .catch((err) =>
        {
            console.log('Error:\n', err);
            req.session.top_info_text = 'There was an error submitting profile info';
            res.redirect(301, '/');
        });
    }

});

module.exports = router;