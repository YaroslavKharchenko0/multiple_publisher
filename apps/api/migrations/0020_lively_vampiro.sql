ALTER TABLE "publications" ADD COLUMN "publication_provider_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "publications" ADD CONSTRAINT "publications_publication_provider_id_publication_providers_id_fk" FOREIGN KEY ("publication_provider_id") REFERENCES "public"."publication_providers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
