ALTER TABLE "files" ALTER COLUMN "provider_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_provider_id_unique" UNIQUE("provider_id");