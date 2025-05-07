CREATE DATABASE node_user;

CREATE TABLE users
(
    id         int primary key AUTO_INCREMENT,
    name       varchar(255) NOT NULL,
    email      varchar(255) NOT NULL,
    password   varchar(255),
    phone      varchar(20),
    is_active  boolean NOT NULL DEFAULT TRUE,
    is_deleted boolean NOT NULL DEFAULT FALSE
);

INSERT INTO users (id, name, email, password, phone, is_active, is_deleted)
VALUES (1, 'Alice', 'alice@example.com', NULL, '1234567890', TRUE, FALSE),
       (2, 'Bob', 'bob@example.com', NULL, '0987654321', TRUE, FALSE),
       (3, 'Charlie', 'charlie@example.com', NULL, '1122334455', FALSE, FALSE),
       (4, 'Diana', 'diana@example.com', NULL, '5566778899', TRUE, TRUE);

DROP TABLE IF EXISTS users;

ALTER TABLE users
ADD COLUMN avatar text;