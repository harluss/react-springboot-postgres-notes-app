--liquibase formatted sql
--changeset harluss:1
CREATE TABLE IF NOT EXISTS notes (
    id bigserial PRIMARY KEY,
    title varchar(100) NOT NULL,
    details text NOT NULL
)
