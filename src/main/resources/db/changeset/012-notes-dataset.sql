--liquibase formatted sql
--changeset harluss:1
INSERT INTO notes (id, title, details)
VALUES
    ('1', 'some title', 'some random text, nothing special'),
    ('2', 'another title', 'again, nothing special'),
    ('3', 'yet title again', 'and again, nothing, nothing at all')
