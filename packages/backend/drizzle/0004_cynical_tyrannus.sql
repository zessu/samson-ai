ALTER TABLE "workoutSchedules" RENAME TO "workoutSettings";--> statement-breakpoint
ALTER TABLE "workoutSettings" DROP CONSTRAINT "workoutSchedules_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workoutSettings" ADD CONSTRAINT "workoutSettings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;