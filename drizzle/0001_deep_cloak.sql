CREATE TABLE IF NOT EXISTS "project_tech" (
	"projectId" integer,
	"tech" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tech" ADD CONSTRAINT "project_tech_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
