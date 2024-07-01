CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"email" text NOT NULL,
	"provider_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_provider_id_unique" UNIQUE("provider_id")
);
