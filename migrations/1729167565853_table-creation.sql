-- Up Migration

CREATE TABLE comment (
  id uuid PRIMARY KEY,
  parent_id uuid,
  author_id uuid NOT NULL,
  content text NOT NULL
);

CREATE TABLE users (
  id uuid PRIMARY KEY,
  name text NOT NULL
);

ALTER TABLE comment ADD FOREIGN KEY (author_id) REFERENCES users (id);

-- Down Migration