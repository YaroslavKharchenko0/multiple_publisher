CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

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
