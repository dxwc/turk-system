const mongoose = require('mongoose');

// _id field is required by mongoose
// ENSURE _id and any custom unique *_id field in same document are exactly same
// use: mongoose.Types.ObjectId()

/**
 * access_type : 0 = temporary user, 1 = regular user
 * role : 0 = developer, 1 = client
 */
mongoose.model
(
    'users',
    new mongoose.Schema
    (
        {
            _id             : { type : mongoose.Schema.Types.ObjectId },
            user_id         : { type : mongoose.Schema.Types.ObjectId, unique : true,
                                index : true, required : true },
            user_name       : { type : String, required : true, unique : true },
            password        : { type : String, required : true },
            access_type     : { type : Boolean, default : false, required : true },
            role            : { type : Boolean, required : true },
            amount_total    : { type : Number, required : true },
            warning_counter : { type : Number, default : 0, required : true },
            creation_time   : { type: Date, default: Date.now, required : true }
        }
    )
);

mongoose.model
(
    'user_name_blacklists',
    new mongoose.Schema
    (
        {
            user_name : { type : String, unique : true, required : true },
            reason    : { type : String, required : true },
            expires   : { type: Date, required : true }
        }
    )
);

mongoose.model
(
    'system_transactions',
    new mongoose.Schema
    (
        {
            from_user   : { type : mongoose.Schema.Types.ObjectId, required: true,
                            ref : 'users', required : true },
            amount      : { type : Number, required : true },
            time        : { type : Date, default: Date.now, required : true },
            is_verified : { type : Boolean, default : false, required : true }
        }
    )
);

/**
 * status: 0 = rejected, 1 = accepted, pending: 2
 */
mongoose.model
(
    'temporary_users',
    new mongoose.Schema
    (
        {
            user_id        : { type : mongoose.Schema.Types.ObjectId, required: true,
                               ref : 'users', unique: true, required : true },
            deposit_amount : { type : Number, required : true },
            status         : { type : Number, default : 2, required : true }
        }
    )
);

mongoose.model
(
    'developers',
    new mongoose.Schema
    (
        {
            user_id         : { type : mongoose.Schema.Types.ObjectId, required: true,
                                ref : 'users', unique: true, required : true },
            interrest       : { type : String, required: true },
            prev_work_info  : { type : String, required : true }
        }
    )
);

mongoose.model
(
    'clients',
    new mongoose.Schema
    (
        {
            user_id   : { type : mongoose.Schema.Types.ObjectId, required: true,
                          ref : 'users', unique: true, required : true },
            interrest : { type : String, required: true },
            biz_cred  : { type : String, required : true }
        }
    )
);

mongoose.model
(
    'user_transactions',
    new mongoose.Schema
    (
        {
            to_user     : { type : mongoose.Schema.Types.ObjectId, required: true,
                            ref : 'users', required : true },
            from_user   : { type : mongoose.Schema.Types.ObjectId, required: true,
                            ref : 'users', required : true },
            amount      : { type : Number, required : true },
            time        : { type : Date, default: Date.now, required : true },
            is_verified : { type : Boolean, default : false, required : true }
        }
    )
);

mongoose.model
(
    'system_demands',
    new mongoose.Schema
    (
        {
            _id       : { type : mongoose.Schema.Types.ObjectId },
            post_id   : { type : mongoose.Schema.Types.ObjectId, unique : true,
                          index : true, required : true },
            client_id : { type : mongoose.Schema.Types.ObjectId, required: true,
                          ref : 'clients', required : true },
            syst_spec : { type : String, required : true },
            timeline  : [ { deadline : { type : Date},
                          description : { type : String } } ],
            bidders   : [ { type: mongoose.Schema.Types.ObjectId,
                          ref : 'developer' } ],
            chosen_id : { type : mongoose.Schema.Types.ObjectId, required: true,
                          ref : 'developer' },
            reason    : { type : String },
            created_t : { type: Date, default: Date.now, required : true },
            deliver_t : { type : Date }
        }
    )
);

/**
 * rating type : 0 = client to dev, 1 = dev to client
 */
mongoose.model
(
    'ratings',
    new mongoose.Schema
    (
        {
            to_user     : { type : mongoose.Schema.Types.ObjectId, required: true,
                            ref : 'users', required : true },
            from_user   : { type : mongoose.Schema.Types.ObjectId, required: true,
                            ref : 'users', required : true },
            post_id     : { type : mongoose.Schema.Types.ObjectId, required: true,
                            ref : 'system_demand', required : true },
            rating_type : { type : Boolean, required : true },
            rating_text : { type : String },
            rating_num  : { type : Number, required : true },
            time        : { type : Date, default: Date.now, required : true }
        }
    )
);

mongoose.model
(
    'warning_protests',
    new mongoose.Schema
    (
        {
            user_id : { type : mongoose.Schema.Types.ObjectId, required: true,
                        ref : 'users', required : true },
            message : { type : String, required : true },
            time    : { type : Date, default: Date.now, required : true },
        }
    )
);

mongoose.model
(
    'quit_demands',
    new mongoose.Schema
    (
        {
            user_id : { type : mongoose.Schema.Types.ObjectId, required: true,
                        ref : 'users', required : true },
            message : { type : String, required : true },
            time    : { type : Date, default: Date.now, required : true },
        }
    )
);