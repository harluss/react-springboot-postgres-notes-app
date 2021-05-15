--liquibase formatted sql
--changeset harluss:1
CREATE TABLE IF NOT EXISTS notes (
    id bigserial PRIMARY KEY,
    title text NOT NULL,
    details text NOT NULL
);
--rollback drop table notes

--changeset harluss:2
ALTER TABLE notes
    ADD COLUMN is_pinned BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
--rollback alter table notes drop column is_pinned, drop column created_at, drop column updated_at
