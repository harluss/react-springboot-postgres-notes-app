--liquibase formatted sql
--changeset harluss:1
INSERT INTO notes (title, details, is_pinned, created_at, updated_at)
VALUES
    ('some title', 'some random text, nothing special', true, NOW() - interval '1 hour', NOW() - interval '1 hour'),
    ('another title', 'again, nothing special', false, NOW() - interval '1 day', NOW() - interval '1 day'),
    ('yet title again', 'and again, nothing, nothing at all', false, NOW() - interval '2 days', NOW() - interval '2 days');
