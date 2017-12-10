--  1 : successful setup
--  0 : user is in blacklist includes reason and expires
-- -1 : exception checking whether user in blacklist
-- -2 : user's access type is false (hasn't yet been accepted)
-- -3 : exception occured somewhere in the operation of this function
DROP FUNCTION IF EXISTS setup_regular_user(BIGINT, TEXT, TEXT, TEXT);
CREATE FUNCTION setup_regular_user
(
    _user_id BIGINT,
    _interest TEXT,
    _cred_link TEXT,
    _pic_link TEXT
)
RETURNS TABLE
(
    code INT,
    reason TEXT,
    expires TIMESTAMP WITHOUT TIME ZONE
)
AS $$
DECLARE
    _access_type BOOLEAN DEFAULT FALSE;
    _code INT;
    _reason TEXT;
    _expires TIMESTAMP WITHOUT TIME ZONE;
BEGIN
    BEGIN
        SELECT access_type
            INTO _access_type
        FROM users
        WHERE user_id = _user_id;

        SELECT b.code, b.reason, b.expires
            INTO _code, _reason, _expires
        FROM is_in_blacklist(_user_id) AS b;

        IF _code = -1 THEN -- exception from 
            RETURN QUERY
                SELECT
                    -1 AS code,
                    _reason AS reason,
                    _expires AS expires;
        ELSIF _code = 1 THEN -- in blacklist
            RETURN QUERY
                SELECT
                    0 AS code,
                    _reason AS reason,
                    _expires AS expires;
        ELSIF _access_type = FALSE THEN -- user hasn't been accepted yet to become regular
            RETURN QUERY
                SELECT
                    -2 AS code,
                    _reason AS reason,
                    _expires AS expires;
        ELSE -- not in blacklist
            INSERT INTO regular_users
            (
                user_id,
                interest,
                cred_link,
                pic_link
            )
            VALUES
            (
                _user_id,
                _interest,
                _cred_link,
                _pic_link
            );

            UPDATE users
            SET first_use = false
            WHERE user_id = _user_id;

            RETURN QUERY
                SELECT
                    1 AS code,
                    _reason AS reason,
                    _expires AS expires;
        END IF;
    EXCEPTION WHEN OTHERS THEN
            RETURN QUERY
                SELECT
                    -3 AS code,
                    _reason AS reason,
                    _expires AS expires;
    END;
END;
$$ LANGUAGE PLPGSQL;
