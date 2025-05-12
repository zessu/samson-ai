CREATE TYPE weekdays AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

CREATE TABLE "workoutSchedules" (
	"weekdays" weekdays[],
	"workout_time" timestamp with time zone,
	"workout_duration" smallint,
	"offset" smallint,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workoutSchedules" ADD CONSTRAINT "workoutSchedules_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "workout_time";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "workout_duration";