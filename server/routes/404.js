'use strict';

const router = require('../server.js').router;

router.get('*', (req, res) =>
{
    res.status(404).send('404 Page not found');
});

module.exports = router;
