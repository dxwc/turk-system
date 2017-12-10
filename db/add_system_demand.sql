DROP FUNCTION IF EXISTS add_system_demand(BIGINT, TEXT, TIMESTAMP WITHOUT TIME ZONE);
CREATE FUNCTION add_system_demand
(
    _poster_id BIGINT,
    _system_spec TEXT,
    _deadline TIMESTAMP WITHOUT TIME ZONE
)
RETURNS INT
AS $$
DECLARE
    _code INT;
    _access_type BOOLEAN;
    _role BOOLEAN;
BEGIN
    BEGIN
        SELECT access_type, role INTO _access_type, _role
        FROM users
        WHERE user_id = _poster_id;

        SELECT b.code INTO _code
        FROM is_in_blacklist(_poster_id) as b;

        IF _role = TRUE AND _access_type = TRUE AND _code = 0 THEN
            INSERT INTO system_demands
            (
                poster_id,
                system_spec,
                deadline
            )
            VALUES
            (
                _poster_id,
                _system_spec,
                _deadline
            );
            RETURN 1;
        ELSE
            RETURN 0;
        END IF;

    EXCEPTION WHEN OTHERS THEN
        RETURN -1;
    END;
END;
$$ LANGUAGE PLPGSQL;
