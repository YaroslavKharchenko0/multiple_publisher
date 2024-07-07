ALTER TABLE "files" ALTER COLUMN "provider_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "path" varchar(255);