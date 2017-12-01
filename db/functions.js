/**
 * Defines easy to callable functions to perform database related operations
 */

let mongoose = require('mongoose');
let validator = require('validator');
let assert = require('assert');
// require('../index'); // remove/comment after testing

/**
 * Add a temporary user if add-able,
 * Reject returns : { func_error : text , text : <error text> }
 * Resolve returns : user_id of inserted
 * @param {String} user_name
 * @param {String} password
 * @param {Boolean} role false : developer, true : client
 * @param {Number} deposit_amount
 * @returns {Promise}
 */
function add_user
(
    user_name,
    password,
    role,
    deposit_amount,
)
{
    password = validator.escape(password);

    let user_id = mongoose.Types.ObjectId();

    return mongoose.model('user_name_blacklists')
    .findOne({ user_name : user_name})
    .then((result) =>
    {
        if(result !== null) throw { errCode : 0, data : result };

        return mongoose.model('users')
               .findOne({ user_name : user_name });
    })
    .then((result) =>
    {
        if(result !== null) throw { errCode : 1, data : result };

        return new (mongoose.model('users'))
        (
            {
                _id : user_id,
                user_id : user_id,
                user_name : user_name,
                password : password,
                role : role,
                amount_total : deposit_amount,
            }
        )
        .save()
        .catch((err) =>
        {
            throw { errCode : 2, error : err };
        })
    })
    .then((result) =>
    {
        return new (mongoose.model('temporary_users'))
        (
            {
                user_id : result.user_id,
                deposit_amount : result.amount_total
            }
        )
        .save()
        .catch((err) =>
        {
            throw { errCode : 3, error : err };
        })
    })
    .then((result) =>
    {
        return new (mongoose.model('system_transactions'))
        (
            {
                from_user : result.user_id,
                amount : deposit_amount * 0.05
            }
        )
        .save()
        .catch((err) =>
        {
            throw { errCode : 4, error : err };
        })
    })
    .then((result) =>
    {
        return user_id;
    })
    .catch((err) =>
    {
        if(err.errCode === 0)
        {
            throw {
                func_error : true,
                text : 'Username is in blacklist for reason: "' + err.data.reason
                       +'", until: "' + err.data.expires + '"'
            }
        }
        else if(err.errCode === 1)
        {
            throw {
                func_error : true,
                text: 'Username is taken'
            }
        }
        else if(err.errCode === 2)
        {
            console.error('Error inserting to users database:\n', err.error);
            throw {
                func_error : true,
                text : 'Error inserting to users database. Contact super user'
            }
        }
        else if(err.errCode === 3)
        {
            console.error('Error inserting to temporary users database:\n',err.error);

            mongoose.model('users')
            .findOneAndRemove({ user_id : user_id })
            .catch((err) =>
            {
                console.error('Rollback error on : remove from users');
            });

            throw {
                func_error : true,
                text: 'Error inserting to temporary users database:\n'
            }
        }
        else if(err.errCode === 4)
        {
            console.error('Error recording 5% system transaction:\n', err.error);

            mongoose.model('temporary_users')
            .findOneAndRemove({ user_id : user_id })
            .catch((err) =>
            {
                console.error('Rollback 1 error on : remove from temporary_users');
            });

            mongoose.model('users')
            .findOneAndRemove({ user_id : user_id })
            .catch((err) =>
            {
                console.error('Rollback 2 error on : remove from users');
            });

            throw {
                func_error : true,
                text : 'Error recording 5% system transaction. Contact super user'
            }
        }
        else
        {
            console.error('Unknown error adding user:\n', err);
            throw {
                func_error : true,
                text: 'Unknwon error adding user'
            }
        }
    });
}

/**
 * resolve: query of a 'users' document, reject : error object
 * @param {String} user_name
 * @param {String} password
 * @returns {Promise}
 */
function query_users(user_name, password)
{
    // errCode summery:
    // 0 : invalid input, user can't possibly be in database
    // 1 : user is in blacklist, relevent document in data field
    // 2 : user is not in blacklist and also not in users collection
    // 3 : unknown error occured in querying collections, error in error field

    return new Promise((resolve, reject) =>
    {
        try
        {
            user_name = user_name.toLowerCase();
            assert(user_name.length >= 3);
            let alpha = 'abcdefghijklmnopqrstuvwxyz';
            let alpha_numeric = 'abcdefghijklmnopqrstuvwxyz1234567890';
            assert(alpha.indexOf(user_name[0]) !== -1);
            for(let i = 0; i < user_name.length; ++i)
                assert(alpha_numeric.indexOf(user_name[i]) !== -1);

            assert(password.length >= 5);
        }
        catch(err)
        {
            reject({ errCode : 0, error : err });
        }

        password = validator.escape(password);

        return mongoose.model('user_name_blacklists')
        .findOne({ user_name : user_name})
        .then((result) =>
        {
            if(result !== null) reject({ errCode: 1, data: result });

            return mongoose.model('users')
            .findOne({ user_name : user_name, password : password })
        })

        .then((result) =>
        {
            if(result === null) reject({ errCode: 2, text: 'User not found' });
            else resolve(result);
        })
        .catch((err) =>
        {
            reject({ errCode : 3, error : err });
        });
    });
}

/**
 * Add a document in quit_demands collection
 * @param {ObjectId} user_id -- user object ID
 * @param {String} quit_details -- optional details if provided by user
 */
function record_a_quit_demand(user_id, quit_details)
{
    let obj_to_save = { user_id : user_id };

    if(quit_details !== undefined)
        obj_to_save.message = validator.escape(quit_details);

    return new (mongoose.model('quit_demands'))(obj_to_save).save();
}

module.exports.add_user = add_user;
module.exports.query_users = query_users;
module.exports.record_a_quit_demand = record_a_quit_demand;