INSERT INTO roles (role) VALUES ('user'), ('admin') ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION check_workspace_deletion()
  RETURNS TRIGGER AS $$
  BEGIN
    IF (
      SELECT COUNT(*)
      FROM workspaces
      WHERE user_id = OLD.user_id
    ) = 1 THEN
      RAISE EXCEPTION 'Cannot delete the last workspace of a user';
    END IF;
    RETURN OLD;
  END;
  $$ LANGUAGE plpgsql;

CREATE TRIGGER before_workspace_delete
  BEFORE DELETE ON workspaces
  FOR EACH ROW
  EXECUTE FUNCTION check_workspace_deletion();

INSERT INTO workspace_roles (role) VALUES ('admin'), ('editor'), ('viewer') ON CONFLICT DO NOTHING;
