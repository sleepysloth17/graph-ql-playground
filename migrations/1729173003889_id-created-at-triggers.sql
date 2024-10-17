-- Up Migration

-- default comment id trigger
CREATE FUNCTION default_comment_id () RETURNS trigger AS $$
BEGIN
  NEW.id := uuid_generate_v4();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER create_comment_id
  BEFORE INSERT ON comment
  FOR EACH ROW
  WHEN (NEW.id IS NULL)
  EXECUTE FUNCTION default_comment_id();

-- default comment created_at trigger
CREATE FUNCTION default_comment_created_at () RETURNS trigger AS $$
BEGIN
  NEW.created_at := extract(epoch from now()) * 1000;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER create_comment_created_at
  BEFORE INSERT ON comment
  FOR EACH ROW
  WHEN (NEW.created_at IS NULL)
  EXECUTE FUNCTION default_comment_created_at();

-- Default user id trigger
CREATE FUNCTION default_users_id () RETURNS trigger AS $$
BEGIN
  NEW.id := uuid_generate_v4();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER create_users_id
  BEFORE INSERT ON users
  FOR EACH ROW
  WHEN (NEW.id IS NULL)
  EXECUTE FUNCTION default_users_id();

-- Down Migration