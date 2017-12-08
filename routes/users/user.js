let router = require('express').Router();
let db_func = require('../../db/functions');
let router_func = require('../functions');

router.get('/user', (req, res) =>
{
    res.render('user_search');
});

router.post('/user', (req, res) =>
{
    db_func.query_by_user_name(req.body.search_string)
    .then((result) =>
    {
        res.render('user_search', { result : result });
    })
    .catch((err) =>
    {
        console.log(err);
        res.render('user_search', { top_info_text : 'Error Searching query' });
    });
})

router.get('/user/user_id', (req, res) =>
{
    res.send('TO BE IMPLEMENTED. GET sent: ' + req.params.user_id);
});

module.exports = router;