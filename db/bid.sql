DROP FUNCTION IF EXISTS bid(BIGINT, BIGINT, NUMERIC(100, 2));
CREATE FUNCTION bid
(
    _post_id BIGINT,
    _bidder_id BIGINT,
    _bid_price NUMERIC(100, 2)
)
RETURNS INT
AS $$
DECLARE
    _code INT;
    _access_type BOOLEAN;
    _role BOOLEAN;
    _count INT DEFAULT 0;
    _deadline TIMESTAMP WITHOUT TIME ZONE;
BEGIN
    BEGIN
        SELECT access_type, role INTO _access_type, _role
        FROM users
        WHERE user_id = _bidder_id;

        SELECT b.code INTO _code
        FROM is_in_blacklist(_bidder_id) as b;

        SELECT count(*) INTO _count from system_demands WHERE post_id = _post_id;
        SELECT deadline INTO _deadline from system_demands WHERE post_id = _post_id;

        IF
            _role = FALSE       AND
            _access_type = TRUE AND
            _code = 0           AND
            _count = 1          AND
            _deadline >  NOW()
        THEN
            INSERT INTO demand_bids
            (
                post_id,
                bidder_id,
                bid_price
            )
            VALUES
            (
                _post_id,
                _bidder_id,
                _bid_price
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
