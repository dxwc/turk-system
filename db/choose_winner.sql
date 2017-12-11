DROP FUNCTION IF EXISTS choose_winner(BIGINT, BIGINT, BIGINT, TEXT);
CREATE FUNCTION choose_winner
(
    _post_id BIGINT,
    _client_id BIGINT,
    _winner_id BIGINT,
    _choice_reason TEXT DEFAULT NULL
)
RETURNS INT
AS $$
DECLARE
    _code1 INT;
    _code2 INT;
    _client_count INT DEFAULT 0;
    _client_total NUMERIC(100, 2);
    _min_price NUMERIC(100, 2);
    _winner_price NUMERIC(100, 2) DEFAULT -1;
    _winner_name TEXT;
BEGIN
    BEGIN
        SELECT b.code INTO _code1
        FROM is_in_blacklist(_client_id) as b;

        SELECT b.code INTO _code2
        FROM is_in_blacklist(_client_id) as b;

        SELECT count(*)
        INTO _client_count
        FROM system_demands
        WHERE
            poster_id = _client_id AND
            post_id = _post_id AND
            deadline > NOW();

        SELECT amount_total
        INTO _client_total
        FROM users
        WHERE user_id = _client_id;

        SELECT bid_price
        INTO _winner_price
        FROM demand_bids
        WHERE
            post_id = _post_id AND
            bidder_id = _winner_id;

        SELECT MIN(bid_price)
        INTO _min_price
        FROM demand_bids
        WHERE
            post_id = _post_id;

        SELECT user_name INTO _winner_name FROM users where user_id = _winner_id;
        
        IF
            _code1 = 0 AND
            _code2 = 0 AND
            _client_count = 1 AND
            (_client_total > _winner_price + (_winner_price * 0.05)) AND
            (
                (_min_price != _winner_price AND _choice_reason != NULL) OR
                (_min_price = _winner_price)
            )
        THEN
            INSERT INTO bid_winners
            (
                post_id,
                winner_id,
                choice_reason
            )
            VALUES
            (
                _post_id,
                _winner_id,
                _choice_reason
            );

            PERFORM user_transaction
            (
                _client_id,
                _winner_name,
                _winner_price/2
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
