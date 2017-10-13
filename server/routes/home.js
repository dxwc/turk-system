'use strict';

const router = require('../index.js').router;

router.get('/', (req, res) =>
{
    res.send('Hello World');
});

module.exports = router;