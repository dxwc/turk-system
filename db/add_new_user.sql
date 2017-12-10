DROP FUNCTION IF EXISTS add_new_user(TEXT, TEXT, BOOLEAN, NUMERIC(100, 2));
CREATE FUNCTION add_new_user
(
    _user_name TEXT,
    _password TEXT,
    _role BOOLEAN,
    _deposit_amount NUMERIC(100, 2)
)
RETURNS TABLE
(
    code INT,
    user_id BIGINT,
    reject_reason TEXT,
    reject_expires TIMESTAMP WITHOUT TIME ZONE
) AS $$
DECLARE
    _user_id BIGINT;
    _blacklist_count BIGINT DEFAULT 30;
    _blacklist_reason TEXT DEFAULT NULL;
    _blacklist_expires TIMESTAMP WITHOUT TIME ZONE;
BEGIN
    BEGIN
        SELECT count(*)
        INTO _blacklist_count
        FROM user_name_blacklists
        WHERE user_name = _user_name AND expires > NOW();

        SELECT reason, expires
        INTO _blacklist_reason, _blacklist_expires
        FROM user_name_blacklists
        WHERE user_name = _user_name AND expires > NOW();

        IF _blacklist_count = 0 THEN

            INSERT INTO users
            (
                user_name,
                password,
                role,
                amount_total
            )
            VALUES
            (
                _user_name,
                _password,
                _role,
                _deposit_amount
            )
            RETURNING users.user_id INTO _user_id;

            INSERT INTO system_transactions
            (
                from_user,
                amount,
                time
            )
            VALUES
            (
                _user_id,
                _deposit_amount * 0.05,
                NOW()
            );
            RETURN QUERY -- success
                SELECT
                    1 AS code,
                    _user_id AS user_id,
                    _blacklist_reason AS reject_reason,
                    _blacklist_expires AS reject_expires;
        ELSE
            RETURN QUERY -- failed for being in blacklist
                SELECT
                    -1 AS code,
                    _user_id AS user_id,
                    _blacklist_reason AS reject_reason,
                    _blacklist_expires AS reject_expires;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY -- failed for other reason
            SELECT
                -2 AS code,
                _user_id AS user_id,
                _blacklist_reason AS reject_reason,
                _blacklist_expires AS reject_expires;
    END;
END;
$$ LANGUAGE PLPGSQL;
