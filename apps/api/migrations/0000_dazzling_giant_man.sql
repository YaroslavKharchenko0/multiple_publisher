CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
