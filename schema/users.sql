CREATE DATABASE node-user;

CREATE TABLE users
(
    id         int primary key,
    name       varchar(255),
    email      varchar(255),
    password   varchar(255),
    phone      varchar(20),
    is_active  boolean,
    is_deleted boolean
);



INSERT INTO users (id, name, email, password, phone, is_active, is_deleted)
VALUES (1, 'Alice', 'alice@example.com', NULL, '1234567890', TRUE, FALSE),
       (2, 'Bob', 'bob@example.com', NULL, '0987654321', TRUE, FALSE),
       (3, 'Charlie', 'charlie@example.com', NULL, '1122334455', FALSE, FALSE),
       (4, 'Diana', 'diana@example.com', NULL, '5566778899', TRUE, TRUE);