ALTER TABLE "accounts" ADD COLUMN "internal_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_internal_id_unique" UNIQUE("internal_id");