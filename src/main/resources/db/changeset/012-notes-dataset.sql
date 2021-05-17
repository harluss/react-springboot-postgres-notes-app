--liquibase formatted sql
--changeset harluss:1
INSERT INTO notes (title, details, is_pinned, created_at, updated_at)
VALUES
    ('some title', 'some random text, nothing special', true, NOW(), NOW()),
    ('another title', 'again, nothing special', false, NOW(), NOW()),
    ('yet title again', 'and again, nothing, nothing at all', false, NOW(), NOW())
