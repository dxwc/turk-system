let router = require('express').Router();
let mongoose = require('mongoose');

router.get('/', (req, res) =>
{
    res.render('home');
});

router.post('/', (req, res) =>
{
    if(req.body && typeof(req.body.s_user_name_check) === 'string')
    {
        // >>>> Repeating front-end checks >>>>
        let s_user_name = req.body.s_user_name_check.toLocaleLowerCase();
        if(s_user_name.length < 3)
            return res.send('Username must be at least 3 character');

        let a_to_z = 'abcdefghijklmnopqrstuvwxyz';
        let alpha_numeric = 'abcdefghijklmnopqrstuvwxyz1234567890';

        if(a_to_z.indexOf( `${s_user_name[0]}`.toLowerCase() ) === -1)
            return res.send('First character must be a letter');

        for(let i = 0; i < s_user_name.length; ++i)
        {
            if
            (
                alpha_numeric
                .indexOf(`${s_user_name[i]}`.toLocaleLowerCase()) === -1
            )
            {
                return res.send
                (
                        'Invalid character \'' +
                        s_user_name[i]         +
                        '\' at position '      +
                        (i+1)
                );
                break;
            }
        }
        // <<<< Repeating front-end checks <<<<

        mongoose.model('blacklist_user_name')
        .findOne({ user_name : s_user_name })
        .exec()
        .then((result) =>
        {
            if(result)
            {
                res.send('This username in blacklist');
                throw -1; // indicates already sent
            }

            let ip = req.headers['x-forwarded-for'] ||
                     req.connection.remoteAddress;

            return mongoose.model('blacklist_ip')
                   .findOne({ user_ip : ip })
                   .exec();
        })
        .then((result) =>
        {
            if(result)
            {
                res.send('This username in blacklist');
                throw -1; // indicates already sent
            }

            return mongoose.model('users')
                   .findOne({ user_name : s_user_name })
                   .exec();
        })
        .then((result) =>
        {
            if(result) res.send(false); // user name taken
            else       res.send(true);  // user name not taken
        })
        .catch((err) =>
        {
            if(err === -1) return; // as already sent
            else
            {
                console.log('Error:\n', err);
                res.status(500); // internal server error
            }
        });
    }
    else
    {
        return res.status(400); // bad request
    }
});

/** Exports needed to be able to include handler in index in app.use(...) */
module.exports = router;
