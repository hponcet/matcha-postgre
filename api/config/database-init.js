const db = require('../db')

const initDatabase = () => {
  console.log('[DB] Database initialization...')
  return db.query(
    `
      CREATE OR REPLACE FUNCTION generate_object_id() RETURNS varchar AS $$
        DECLARE
          time_component bigint;
          machine_id bigint := FLOOR(random() * 16777215);
          process_id bigint;
          seq_id bigint := FLOOR(random() * 16777215);
          result varchar:= '';
        BEGIN
          SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp())) INTO time_component;
          SELECT pg_backend_pid() INTO process_id;

          result := result || lpad(to_hex(time_component), 8, '0');
          result := result || lpad(to_hex(machine_id), 6, '0');
          result := result || lpad(to_hex(process_id), 4, '0');
          result := result || lpad(to_hex(seq_id), 6, '0');
          RETURN result;
        END;
      $$ LANGUAGE PLPGSQL;

      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sex') THEN
            CREATE TYPE sex AS ENUM ('1', '2');
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'orientation') THEN
            CREATE TYPE orientation AS ENUM ('1', '2', '3');
          END IF;
      END$$;

      CREATE TABLE IF NOT EXISTS users
      (
        "id" varchar(64) default generate_object_id() UNIQUE NOT NULL,
        "firstname" varchar(64),
        "lastname" varchar(64),
        "email" varchar(64) NOT NULL,
        "sex" sex NOT NULL,
        "pseudo" varchar(64) NOT NULL,
        "birthday" timestamp with time zone NOT NULL,
        "password" varchar(64) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tags
      (
        "id" SERIAL UNIQUE,
        "name" varchar(64) UNIQUE NOT NULL,
        "ids" text[]
      );

      CREATE TABLE IF NOT EXISTS profils
      (
        "id" varchar(64) UNIQUE NOT NULL,
        "tags" text[],
        "pseudo" varchar(64) NOT NULL,
        "sex" sex NOT NULL,
        "location" jsonb,
        "birthday" timestamp with time zone NOT NULL,
        "orientation" orientation NOT NULL,
        "biography" varchar(64),
        "pictures" jsonb[],
        "profilPicture" varchar(64),
        "history" jsonb,
        "likes" jsonb[],
        "matchs" jsonb[]
      )
    `
  )
  .then(() => console.log('[DB] Database initialized.'))
  .catch(err => console.error(err))
}

module.exports = initDatabase
