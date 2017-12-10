DROP OWNED BY turk_admin CASCADE;

CREATE TABLE users
(
    user_id         BIGSERIAL PRIMARY KEY,
    user_name       TEXT NOT NULL UNIQUE,
    password        TEXT NOT NULL,
    access_type     BOOLEAN NOT NULL DEFAULT FALSE,
    role            BOOLEAN NOT NULL,
    amount_total    NUMERIC(100, 2),
    first_use       BOOLEAN NOT NULL DEFAULT TRUE,
    creation_time   TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE regular_users
(
    user_id     BIGINT PRIMARY KEY REFERENCES users(user_id),
    interest    TEXT NOT NULL,
    cred_link   TEXT NOT NULL,
    pic_link    TEXT NOT NULL,
    warning_counter SMALLINT NOT NULL DEFAULT 0
);


CREATE TABLE user_name_blacklists
(
    user_name TEXT PRIMARY KEY,
    reason    TEXT NOT NULL,
    expires   TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE system_transactions
(
    from_user   BIGINT REFERENCES users(user_id),
    amount      NUMERIC(100, 2),
    time        TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE user_transactions
(
    to_user     BIGINT REFERENCES users(user_id),
    from_user   BIGINT REFERENCES users(user_id),
    amount      NUMERIC(100, 2),
    time        TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE system_demands
(
    post_id BIGSERIAL PRIMARY KEY,
    poster_id BIGINT REFERENCES regular_users(user_id),
    system_spec TEXT NOT NULL,
    deadline TIMESTAMP NOT NULL
);

CREATE TABLE demand_bids
(
    post_id   BIGINT REFERENCES system_demands(post_id),
    bidder_id BIGINT REFERENCES regular_users(user_id),
    bid_price NUMERIC(100, 2) NOT NULL
);

CREATE TABLE bid_winners
(
    post_id   BIGINT PRIMARY KEY REFERENCES system_demands(post_id),
    winner_id BIGINT REFERENCES regular_users(user_id),
    choice_reason TEXT
);

CREATE TABLE deliverables
(
    post_id       BIGINT PRIMARY KEY REFERENCES system_demands(post_id),
    developer_id  BIGINT REFERENCES regular_users(user_id),
    delivery_link TEXT NOT NULL
);

CREATE table ratings
(
    post_id      BIGINT PRIMARY KEY REFERENCES system_demands(post_id),
    poster_id    BIGINT REFERENCES regular_users(user_id),
    rating_type  BOOLEAN NOT NULL,
    rating_text  TEXT,
    time         TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE warning_protests
(
    user_id BIGINT REFERENCES regular_users(user_id),
    message TEXT NOT NULL,
    time    TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE quit_demands
(
    user_id BIGINT PRIMARY KEY REFERENCES regular_users(user_id),
    message TEXT,
    ignored BOOLEAN DEFAULT FALSE,
    time    TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
