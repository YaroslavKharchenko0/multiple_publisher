CREATE TABLE IF NOT EXISTS "publication_providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_provider_id" integer NOT NULL,
	"key" varchar(50) NOT NULL,
	CONSTRAINT "publication_providers_key_unique" UNIQUE("key")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "publication_providers" ADD CONSTRAINT "publication_providers_account_provider_id_account_providers_id_fk" FOREIGN KEY ("account_provider_id") REFERENCES "public"."account_providers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
