'use strict';

// Stripe example:

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret      = process.env.SECRET_KEY;

const router = require('../index.js').router;
const stripe = require("stripe")(process.env.SECRET_KEY);

router.post('/charge', (req, res) =>
{
    // res.json(req.body);

    // Expected req.body example:
    // {
    //      stripeToken: 'tok_1B901i2eZvKYlo2CY6e7yP53',
    //      stripeTokenType: 'card',
    //      stripeEmail: 'sdkfsdfjsdfsdf@sdfsdfdfds.com'
    // }

    // Charging example:

    let amount = 500; // $5.00
    stripe.customers.create // TODO: Charge in admin panel after acceptace
    (
        {
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        }
    )
    .then((customer) =>
    {
        return stripe.charges.create
        (
            {
                amount,
                description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            }
        )
    })
    .then((charge) =>
    {
        res.json(charge);
    })
    .catch((err) =>
    {
        console.log('Error', err);
        res.send(err);
    })
});

module.exports = router;