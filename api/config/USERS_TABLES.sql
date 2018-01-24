CREATE TYPE sexType AS ENUM (1, 2)
CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  firstname varchar(64),
  lastname varchar(64),
  email varchar(64) NOT NULL,
  sex sexType NOT NULL,
  pseudo varchar(64) NOT NULL,
  birthday timestamp [ (p) ] with time zone NOT NULL,
  password varchar(64) NOT NULL,
  profilId
)
