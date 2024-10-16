-- Up Migration

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO books (id, name)
VALUES
  (uuid_generate_v4(), 'book one'),
  (uuid_generate_v4(), 'book two'),
  (uuid_generate_v4(), 'book three');

-- Down Migration