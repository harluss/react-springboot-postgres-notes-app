--liquibase formatted sql
--changeset harluss:1
INSERT INTO notes (title, details)
VALUES
    ('some title', 'some random text, nothing special'),
    ('another title', 'again, nothing special'),
    ('yet title again', 'and again, nothing, nothing at all')
