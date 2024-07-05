CREATE TABLE IF NOT EXISTS "file_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_id" integer NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider_id" varchar(255) NOT NULL,
	"type" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file_metadata" ADD CONSTRAINT "file_metadata_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
