--liquibase formatted sql
--changeset harluss:1
CREATE TABLE IF NOT EXISTS notes (
    id bigserial PRIMARY KEY,
    title text NOT NULL,
    details text NOT NULL,
    is_pinned BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);
--rollback drop table notes
