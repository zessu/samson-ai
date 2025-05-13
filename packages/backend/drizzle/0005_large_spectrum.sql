CREATE TABLE "workout_schedule" (
	"id" text PRIMARY KEY NOT NULL,
	"week" text NOT NULL,
	"day" text NOT NULL,
	"workout" text NOT NULL,
	"calories" smallint NOT NULL,
	"caution" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workout_schedule" ADD CONSTRAINT "workout_schedule_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;