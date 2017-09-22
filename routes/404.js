'use strict';

const router = require('../index.js').router;

router.get('*', (req, res) =>
{
    res.status(404).send('404 Page not found');
});

module.exports = router;
