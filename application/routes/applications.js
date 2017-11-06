let router = require('express').Router();
let mongoose = require('mongoose');

router.get('/applications', (req, res) =>
{
    if
    (
        req.session &&
        req.session.access_code === 'abc123' || process.env.access_code
    )
    {
        if(req.query && req.query.end_session == 'true')
        {
            req.session.destroy((err) => { if(err) console.log('Error', err) });
            return res.render('applications');
        }

        mongoose
        .model('temporary_users')
        .find()
        .where('status').equals('2')
        .populate('_id', 'user_name role creation_time') // uses ref to populate
        .exec()
        .then((result) =>
        {
            console.log(result);
            res.render('applications', { applications : result });
        })
        .catch((err) =>
        {
            res.send(err);
        });
    }
    else
    {
        res.render('applications');
    }
});

router.post('/applications', (req, res) =>
{
    if
    (
        req.body &&
        req.body.access_code &&
        req.body.access_code === 'abc123' || process.env.access_code
    )
    {
        req.session.access_code = 'abc123' || process.env.access_code;
        res.redirect('/applications');
    }
    else
    {
        res.render('applications', { invalid : true });
    }
});

router.post('/decision', (req, res) =>
{
    if(req.session.access_code = 'abc123' || process.env.access_code)
    {
        if
        (
            req.body &&
            req.body.user_id
        )
        {
            if(req.query.boolean == true) { /* accept */ }
            else { /* reject */ }
            res.send('to be implemented');
        }
        else
        {
            res.status(500).end();
        }
    }
    else
    {
        res.redirect('/applications');
    }
})

/** Exports needed to be able to include handler in index in app.use(...) */
module.exports = router;