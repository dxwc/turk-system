-- 0 if NOT in blacklist
-- 1 if in blacklist
DROP FUNCTION IF EXISTS is_in_blacklist(BIGINT);
CREATE FUNCTION is_in_blacklist(_user_id BIGINT)
RETURNS TABLE
(
    code INT,
    reason TEXT,
    expires TIMESTAMP WITHOUT TIME ZONE
)
AS $$
DECLARE
    _count INT DEFAULT 0;
    _reason TEXT;
    _expires TIMESTAMP WITHOUT TIME ZONE;
BEGIN
    BEGIN
        SELECT
            count(*) INTO _count FROM user_name_blacklists AS b
        WHERE
            b.user_name = (SELECT user_name FROM users where user_id = _user_id);

        IF _count = 0 THEN
            RETURN QUERY
                SELECT
                    0 AS code,
                    _reason AS reason,
                    _expires AS expires;
        ELSE
            SELECT
                b.reason, b.expires
            INTO
                _reason, _expires
            FROM
                user_name_blacklists AS b
            WHERE
                b.user_name = (SELECT user_name FROM users where user_id = _user_id);

            RETURN QUERY
                SELECT
                    1 AS code,
                    _reason AS reason,
                    _expires AS expires;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY
            SELECT
                -1 AS code,
                _reason AS reason,
                _expires AS expires;
    END;
END;
$$ LANGUAGE PLPGSQL;
