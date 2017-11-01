// + Server level mongodb schemas, this file is to be required before connecting
//   to mongoDB.
// + See see database section under technical documentation for a plan of overall
//   database schema

const mongoose = require('mongoose');

mongoose.model
(
    'blacklist_user_name',
    new mongoose.Schema
    (
        {
            user_name      : { type : String, required : true, unique : true },
            reason         : { type : String, required : true},
            remaining_time : { type : Number, required : true}
        }
    )
);

mongoose.model
(
    'blacklist_ip',
    new mongoose.Schema
    (
        {
            user_ip : { type : String, required : true, unique : true },
            reason  : { type : String, required : true}
        }
    )
);

mongoose.model
(
    'users',
    new mongoose.Schema
    (
        {
            user_name       : { type : String, required : true, unique : true },
            password        : { type : String, required : true },
            access_type     : { type : Boolean, required : true },
            role            : { type : Boolean, required : true },
            warning_counter : { type : Number, required : true },
            creation_time   : { type : Number, required : true }
        }
    )
);

mongoose.model
(
    'submitted_transactions',
    new mongoose.Schema
    (
        {
            from_user : { type : mongoose.Schema.Types.ObjectId,
                          required: true, ref : 'users' },
            to_user   : { type : mongoose.Schema.Types.ObjectId,
                          required : true, ref : 'users' },
            amount    : { type : Number, required : true },
            time      : { type : Number, required : true },
            verified  : { type : Boolean, required : true }
        }
    )
);

mongoose.model
(
    'temporary_users',
    new mongoose.Schema
    (
        {
            _id        :     { type : mongoose.Schema.Types.ObjectId, ref: 'users' },
            deposit_amount : { type : Number, require : true },
            status         : { type : Number, require : true },
            information    : { type: String }
        }
    )
);