CREATE TABLE IF NOT EXISTS "publication_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"publication_id" integer NOT NULL,
	"file_id" integer NOT NULL,
	"is_original" boolean DEFAULT true
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "publication_files" ADD CONSTRAINT "publication_files_publication_id_publications_id_fk" FOREIGN KEY ("publication_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "publication_files" ADD CONSTRAINT "publication_files_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
