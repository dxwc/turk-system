DROP FUNCTION IF EXISTS accept_user(BIGINT);
CREATE FUNCTION accept_user(_user_id BIGINT)
RETURNS BOOLEAN AS $$
BEGIN
    BEGIN
        UPDATE users SET access_type = true WHERE user_id = _user_id;
        RETURN TRUE;
    EXCEPTION WHEN OTHERS THEN
        RETURN FALSE;
    END;
END;
$$ LANGUAGE PLPGSQL;

DROP FUNCTION IF EXISTS reject_user(BIGINT, TEXT);
CREATE FUNCTION reject_user(_user_id BIGINT, _reject_reason TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    BEGIN
        INSERT INTO user_name_blacklists
        VALUES
        (
            (SELECT user_name FROM users WHERE user_id = _user_id),
            _reject_reason,
            NOW() + '200 years'::interval
        );
        RETURN TRUE;
    EXCEPTION WHEN OTHERS THEN
        RETURN FALSE;
    END;
END;
$$ LANGUAGE PLPGSQL;


