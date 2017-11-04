let router = require('express').Router();
let mongoose = require('mongoose');

router.get('/', (req, res) =>
{
    res.render('home');
});

router.post('/', (req, res) =>
{
    // note: req.body.s_deposit will be of type string

    if(req.body === undefined) return res.status(500).end();
    if(typeof(req.body.s_user_name_check) === 'string')
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
                res.status(500).end(); // internal server error
            }
        });
    }
    else if
    (
        typeof(req.body.s_user_name) === 'string'  &&
        typeof(req.body.s_password)  === 'string'  &&
        typeof(req.body.s_role)      === 'boolean' &&
        /^\d+$/.test(req.body.s_deposit) // regexp test if string is digits only
    )
    {
        // >>>> Repeating front-end checks >>>>
        // s_user_name
        let s_user_name = req.body.s_user_name.toLocaleLowerCase();
        if(s_user_name.length < 3)
            return res.send(false);

        let a_to_z = 'abcdefghijklmnopqrstuvwxyz';
        let alpha_numeric = 'abcdefghijklmnopqrstuvwxyz1234567890';

        if(a_to_z.indexOf( `${s_user_name[0]}`.toLowerCase() ) === -1)
            return res.send(false);

        for(let i = 0; i < s_user_name.length; ++i)
        {
            if
            (
                alpha_numeric
                .indexOf(`${s_user_name[i]}`.toLocaleLowerCase()) === -1
            )
            {
                return res.send(false);
                break;
            }
        }
        // <<<< Repeating front-end checks <<<<

        if(req.body.s_password.length < 5)  return res.send(false);
        if(Number(req.body.s_deposit) < 10) return res.send(false);

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

            return new (mongoose.model('users'))
            (
                {
                    user_name : s_user_name,
                    password : req.body.s_password, // todo hash
                    access_type : false,
                    role : req.body.s_role,
                    warning_counter : 0,
                    creation_time : new Date().getTime()
                }
            )
            .save();
        })
        .then((result) =>
        {
            return new (mongoose.model('temporary_users'))
            (
                {
                    _id : result._id,
                    deposit_amount : Number(req.body.s_deposit),
                    status : 2,
                    information : ''
                }
            )
            .save();
        })
        .then((result) =>
        {
            res.send(true); // application submission sending successful
        })
        .catch((err) =>
        {
            if(err === -1) return;

            try
            {
                err = err.toJSON(); // mongo error
            }
            catch(err)
            {
                console.log('Error:\n', err);
                return res.status(500).end();
            }

            if(err.code == 11000 && err.errmsg) // duplicate code
            {
                if(err.errmsg.search('turk_system.users') !== -1)
                {
                    return res.send('Username taken');
                }
                else if(err.errmsg.search('turk_system.temporary_users') !== -1)
                {
                    res.status(500).end();

                    mongoose.model('users')
                    .find({ user_name : s_user_name })
                    .remove()
                    .exec()
                    .catch((err) =>
                    {
                        console.log('Rollback error', err);
                    });
                }
                else
                {
                    return res.status(500).end();
                }
            }
            else
            {
                return res.send(false);
            }
        });
    }
    else
    {
        return res.status(400).end(); // bad request
    }
});

/** Exports needed to be able to include handler in index in app.use(...) */
module.exports = router;