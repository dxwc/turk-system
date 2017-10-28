let router = require('express').Router();

router.get('/', (req, res) =>
{
    res.render('home');
});

/** Exports needed to be able to include handler in index in app.use(...) */
module.exports = router;