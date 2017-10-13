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
    stripe.customers.create // token is only valid for few minutes, must charge
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
        // res.json(charge);// charge result // stop here if only charge

        // Example refund promise:
        return new Promise((resolve, reject) =>
        {
            stripe.refunds.create
            (
                {
                    charge: charge.id,
                    amount: 500,
                },
                (err, refund) =>
                {
                    if(err) reject(err);
                    else resolve(refund);
                }
            );
        });
    })
    .then((refund) => // delete this block for charge only
    {
        res.json(refund); // refund result
    })
    .catch((err) =>
    {
        console.log('Error', err);
        res.send(err);
    })
});

module.exports = router;