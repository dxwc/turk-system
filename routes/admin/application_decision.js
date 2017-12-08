let router = require('express').Router();
let router_func = require('../functions');
let db_func = require('../../db/functions');

let admin_password = router_func.admin_password;

router.post('/application_decision', (req, res) =>
{
    if(!router_func.admin_logged_in(req))
        return res.status(404).send('404 NOT FOUND');

    // will contian promises:
    let decision_saving_arr = [Promise.resolve('Start of arr')];

    for(let user_id in req.body)
    {
        let decision = undefined;

        if(req.body[user_id][0] === 'accept') decision = true;
        else if(req.body[user_id][0] === 'reject') decision = false;
        else continue;

        decision_saving_arr.push
        (
            db_func.save_application_decision
            (
                user_id,
                decision,
                req.body[user_id][1]
            )
        );
    }

    Promise.all(decision_saving_arr)
    .then((result) =>
    {
        req.session.top_info_text = 'All previous decisions saved';
        res.redirect(301, '/view_applications');
    })
    .catch((err) =>
    {
        console.error(err);

        req.session.top_info_text = 'Save-able decisions saved, some error';
        if(err.message)
            req.session.top_info_text += ' : ' + err.message;
        res.redirect(301, '/view_applications');
    });

});

/**
 * Data recieved will be in this format:
 */

 /*

{ '5a1e51dcce141a40aa141538': [ 'reject', 'Reason for rejection' ],
  '5a1f05d10f465a2156529927': [ 'later', '' ],
  '5a1f147c4e719f26ea875cd9': [ 'accept', '' ],
  '5a1f2403b1d6592eca947a1c': [ 'later', '' ],
  '5a1f2a45680b383237691d8f': [ 'later', '' ],
  '5a1f2a8b5b9cc4326498e74d': [ 'later', '' ],
  '5a1f2aaf00bdea328e9296f0': [ 'later', '' ],
  '5a1f2afb4e19d8331e0d4a72': [ 'later', '' ],
  '5a1f2b70e36f6033a7b63a03': [ 'later', '' ],
  '5a1f2c1dae61cc3434462bc8': [ 'later', '' ],
  '5a2035f91933cf44fd4be1cd': [ 'later', '' ],
  '5a2036867ada4e4568b3e385': [ 'later', '' ],
  '5a2039b0a9dc094a6cea81dc': [ 'later', '' ],
  '5a20ab79e597f32663c7b759': [ 'later', '' ] }
*/

module.exports = router;