import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_forms_blocks_text_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_forms_blocks_textarea_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_forms_blocks_email_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_forms_blocks_phone_number_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_forms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__forms_v_blocks_text_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum__forms_v_blocks_textarea_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum__forms_v_blocks_email_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum__forms_v_blocks_phone_number_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum__forms_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_footer_social_links_icon" ADD VALUE 'arrowRight' BEFORE 'bluesky';
  ALTER TYPE "public"."enum_footer_social_links_icon" ADD VALUE 'close' BEFORE 'instagram';
  ALTER TYPE "public"."enum_footer_social_links_icon" ADD VALUE 'fiverr' BEFORE 'instagram';
  CREATE TABLE IF NOT EXISTS "clients" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"phone_number" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"width" "enum_forms_blocks_text_width" DEFAULT 'full',
  	"description" jsonb,
  	"default_value" varchar,
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"width" "enum_forms_blocks_textarea_width" DEFAULT 'full',
  	"description" jsonb,
  	"default_value" varchar,
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"width" "enum_forms_blocks_email_width" DEFAULT 'full',
  	"description" jsonb,
  	"default_value" varchar,
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_phone_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"width" "enum_forms_blocks_phone_number_width" DEFAULT 'full',
  	"description" jsonb,
  	"default_value" varchar,
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"submit_button_label" varchar DEFAULT 'Submit',
  	"confirmation_message" varchar,
  	"form_only" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_forms_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_forms_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"width" "enum__forms_v_blocks_text_width" DEFAULT 'full',
  	"description" jsonb,
  	"default_value" varchar,
  	"required" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_forms_v_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"width" "enum__forms_v_blocks_textarea_width" DEFAULT 'full',
  	"description" jsonb,
  	"default_value" varchar,
  	"required" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_forms_v_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"width" "enum__forms_v_blocks_email_width" DEFAULT 'full',
  	"description" jsonb,
  	"default_value" varchar,
  	"required" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_forms_v_blocks_phone_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"width" "enum__forms_v_blocks_phone_number_width" DEFAULT 'full',
  	"description" jsonb,
  	"default_value" varchar,
  	"required" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_forms_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_submit_button_label" varchar DEFAULT 'Submit',
  	"version_confirmation_message" varchar,
  	"version_form_only" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__forms_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"form_id" uuid NOT NULL,
  	"client_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "clients_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "forms_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_submissions_id" uuid;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "clients_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_phone_number" ADD CONSTRAINT "forms_blocks_phone_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_forms_v_blocks_text" ADD CONSTRAINT "_forms_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_forms_v_blocks_textarea" ADD CONSTRAINT "_forms_v_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_forms_v_blocks_email" ADD CONSTRAINT "_forms_v_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_forms_v_blocks_phone_number" ADD CONSTRAINT "_forms_v_blocks_phone_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_forms_v" ADD CONSTRAINT "_forms_v_parent_id_forms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions_data" ADD CONSTRAINT "form_submissions_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "clients_email_idx" ON "clients" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_phone_number_order_idx" ON "forms_blocks_phone_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_phone_number_parent_id_idx" ON "forms_blocks_phone_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_phone_number_path_idx" ON "forms_blocks_phone_number" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_title_idx" ON "forms" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "forms__status_idx" ON "forms" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_text_order_idx" ON "_forms_v_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_text_parent_id_idx" ON "_forms_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_text_path_idx" ON "_forms_v_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_textarea_order_idx" ON "_forms_v_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_textarea_parent_id_idx" ON "_forms_v_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_textarea_path_idx" ON "_forms_v_blocks_textarea" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_email_order_idx" ON "_forms_v_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_email_parent_id_idx" ON "_forms_v_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_email_path_idx" ON "_forms_v_blocks_email" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_phone_number_order_idx" ON "_forms_v_blocks_phone_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_phone_number_parent_id_idx" ON "_forms_v_blocks_phone_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_phone_number_path_idx" ON "_forms_v_blocks_phone_number" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_forms_v_parent_idx" ON "_forms_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_forms_v_version_version_title_idx" ON "_forms_v" USING btree ("version_title");
  CREATE INDEX IF NOT EXISTS "_forms_v_version_version_updated_at_idx" ON "_forms_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_forms_v_version_version_created_at_idx" ON "_forms_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_forms_v_version_version__status_idx" ON "_forms_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_forms_v_created_at_idx" ON "_forms_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_forms_v_updated_at_idx" ON "_forms_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_forms_v_latest_idx" ON "_forms_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "form_submissions_data_order_idx" ON "form_submissions_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_submissions_data_parent_id_idx" ON "form_submissions_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_client_idx" ON "form_submissions" USING btree ("client_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_clients_id_idx" ON "payload_preferences_rels" USING btree ("clients_id");
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "featured";
  ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_featured";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_textarea" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_email" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_phone_number" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_forms_v_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_forms_v_blocks_textarea" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_forms_v_blocks_email" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_forms_v_blocks_phone_number" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_forms_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_phone_number" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "_forms_v_blocks_text" CASCADE;
  DROP TABLE "_forms_v_blocks_textarea" CASCADE;
  DROP TABLE "_forms_v_blocks_email" CASCADE;
  DROP TABLE "_forms_v_blocks_phone_number" CASCADE;
  DROP TABLE "_forms_v" CASCADE;
  DROP TABLE "form_submissions_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_clients_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_forms_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_submissions_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_clients_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_clients_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_forms_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_form_submissions_id_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_clients_id_idx";
  ALTER TABLE "articles" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "_articles_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "clients_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "forms_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "form_submissions_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN IF EXISTS "clients_id";
  ALTER TABLE "public"."footer_social_links" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_social_links_icon";
  CREATE TYPE "public"."enum_footer_social_links_icon" AS ENUM('bluesky', 'instagram', 'letterboxd', 'tiktok', 'x');
  ALTER TABLE "public"."footer_social_links" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_footer_social_links_icon" USING "icon"::"public"."enum_footer_social_links_icon";
  DROP TYPE "public"."enum_forms_blocks_text_width";
  DROP TYPE "public"."enum_forms_blocks_textarea_width";
  DROP TYPE "public"."enum_forms_blocks_email_width";
  DROP TYPE "public"."enum_forms_blocks_phone_number_width";
  DROP TYPE "public"."enum_forms_status";
  DROP TYPE "public"."enum__forms_v_blocks_text_width";
  DROP TYPE "public"."enum__forms_v_blocks_textarea_width";
  DROP TYPE "public"."enum__forms_v_blocks_email_width";
  DROP TYPE "public"."enum__forms_v_blocks_phone_number_width";
  DROP TYPE "public"."enum__forms_v_version_status";`)
}
