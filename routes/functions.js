let admin_password = 'abc123';

/**
 * Check if session for logged in users are set, if logged in true, else false
 * @param {Object} -- request object from router
 * @returns {Boolean}
 */
function logged_in(req)
{
    return  req.session.user_id !== undefined &&
            req.session.user_name !== undefined &&
            req.session.access_type !== undefined &&
            req.session.role !== undefined &&
            req.session.amount_total !== undefined &&
            req.session.warning_counter !== undefined;
}

/**
 * Set session variables from given document
 * @param {Object} req -- request object from router
 * @param {Object} users_documnet -- a document from users collection from database
 * @param {String} top_info_text -- optional top text
 * @returns {Void}
 */
function log_user_in(req, users_documnet, top_info_text)
{
    req.session.top_info_text = top_info_text;
    req.session.user_id = users_documnet.user_id;
    req.session.user_name = users_documnet.user_name;
    req.session.access_type = users_documnet.access_type;
    req.session.role = users_documnet.role;
    req.session.amount_total = users_documnet.amount_total;
    req.session.warning_counter = users_documnet.warning_counter;

    // For temporary user add a helpful message:
    if(top_info_text === undefined && users_documnet.access_type === false)
    {
        req.session.top_info_text =
        'You are currently using a temporary account. Once (and if) accepted'
        + ' by super user, you will be have full access to turk system functionalities'
        + ' of your chosen role [developer/client].';
    }
}

/**
 * Sets non-logg-in session variables to undefined
 * @param {Object} req
 * @returns {Void}
 */
function remove_additional_sessions_prop(req)
{
    delete req.session.top_info_text;
    delete req.session.apply_error_text;
    delete req.session.login_error_text;
    delete req.session.apply_error_text;
    delete req.session.apply_user_name;
    delete req.session.apply_deposit_amount;
    delete req.session.apply_role;
    delete req.session.quit_demand_sent;
    delete req.session.quit_demand_error;
}

/**
 * Remove session properties relevent to staying logged in and run session.destroy
 * @param {Object} req
 * @returns {Void}
 */
function logout(req, callback)
{
    // redundant - but in case of error delete
    delete req.session.user_id;
    delete req.session.user_name;
    delete req.session.access_type;
    delete req.session.role;
    delete req.session.amount_total;
    delete req.session.warning_counter;
    delete req.session.admin_password;

    req.session.destroy((err) =>
    {
        if(err)
            req.session.top_info_text =
            'Error: Unable to logout, try restarting browser or contact super user';
        if(typeof callback === 'function') callback();
    });
}

/**
 * Returns an object for logged in case to add to +/ pass to render function as 2nd arg
 * @param {Object} req
 * @param {String} title -- to set title object
 * @returns {Object}
 */
function login_render_object(req, title)
{
    let obj =
    {
        logged_in : true,
        user_id : req.session.user_id,
        user_name : req.session.user_name,
        access_type : req.session.access_type,
        role : req.session.role,
        amount_total : req.session.amount_total,
        warning_counter : req.session.warning_counter,
        top_info_text : req.session.top_info_text
    };

    if(title !== undefined) obj.title = title;

    return obj;
}

/**
 * Returns true if admin is logged in, false otherwise
 * @param {Object} req
 * @returns {Boolean}
 */
function admin_logged_in(req)
{
    return req.session && req.session.admin_password === admin_password;
}

module.exports.logged_in = logged_in;
module.exports.log_user_in = log_user_in;
module.exports.remove_additional_sessions_prop = remove_additional_sessions_prop;
module.exports.logout = logout;
module.exports.login_render_object = login_render_object;
module.exports.admin_password = admin_password;
module.exports.admin_logged_in = admin_logged_in;