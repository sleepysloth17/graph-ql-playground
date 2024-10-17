-- Up Migration

ALTER TABLE comment ADD COLUMN created_at bigint;
ALTER TABLE comment ALTER COLUMN created_at SET NOT NULL;

-- Down Migration