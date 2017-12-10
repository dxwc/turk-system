--  1 : successful transaction
--  0 : from_user doesn't have enough money to make the transaction
--  2 : one or both of the users doesn't have required privilage to make the transaction
-- -1 : exception somewhere
DROP FUNCTION IF EXISTS user_transaction(BIGINT, TEXT, NUMERIC(100, 2));
CREATE FUNCTION user_transaction
(
    _from_user_id BIGINT,
    _to_user_name TEXT,
    _amount NUMERIC(100, 2)
)
RETURNS INT
-- RETURNS TABLE
-- (
    -- code INT,
    -- user_id1 INT,
    -- reason1 TEXT,
    -- expires1 TIMESTAMP WITHOUT TIME ZONE,
    -- user_id2 INT,
    -- reason2 TEXT,
    -- expires2 TIMESTAMP WITHOUT TIME ZONE
-- )
AS $$
DECLARE
    _access_type1 BOOLEAN DEFAULT FALSE;
    _access_type2 BOOLEAN DEFAULT FALSE;
    _to_user_id BIGINT;
    _from_user_total NUMERIC(100, 2);
    _to_user_total NUMERIC(100, 2);
    _code1 INT;
    _code2 INT;
    _reason1 TEXT;
    _reason2 TEXT;
    _expires1 TIMESTAMP WITHOUT TIME ZONE;
    _expires2 TIMESTAMP WITHOUT TIME ZONE;
BEGIN
    BEGIN
        SELECT access_type, amount_total
            INTO _access_type1, _from_user_total
        FROM users
        WHERE user_id = _from_user_id;

        SELECT access_type, user_id, amount_total
            INTO _access_type2, _to_user_id, _to_user_total
        FROM users
        WHERE user_name = _to_user_name;

        SELECT b.code, b.reason, b.expires
            INTO _code1, _reason1, _expires1
        FROM is_in_blacklist(_from_user_id) AS b;

        SELECT b.code, b.reason, b.expires
            INTO _code2, _reason2, _expires2
        FROM is_in_blacklist(_to_user_id) AS b;

        IF
            _access_type1 = TRUE AND
            _access_type2 = TRUE AND
            _code1 = 0 AND
            _code2 = 0
        THEN
            IF _from_user_total >= (_amount + (_amount * 0.05)) THEN
                INSERT INTO user_transactions
                (
                    to_user,
                    from_user,
                    amount
                )
                VALUES
                (
                    _to_user_id,
                    _from_user_id,
                    _amount
                );

                INSERT INTO system_transactions
                (
                    from_user,
                    amount
                )
                VALUES
                (
                    _from_user_id,
                    _amount * 0.05
                );

                UPDATE users
                SET amount_total = _from_user_total - (_amount + (_amount * 0.05))
                WHERE user_id = _from_user_id;

                UPDATE users
                SET amount_total = _to_user_total + _amount
                WHERE user_id = _to_user_id;

                RETURN 1;
            ELSE
                RETURN 0;
            END IF;
        ELSE
            RETURN 2;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        RETURN -1;
    END;
END;
$$ LANGUAGE PLPGSQL;
