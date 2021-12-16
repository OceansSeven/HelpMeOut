DROP DATABASE IF EXISTS helpmeout;

CREATE DATABASE helpmeout;

\c helpmeout;

CREATE TABLE users (
 id BIGSERIAL,
 company VARCHAR,
 password VARCHAR,
 salt VARCHAR,
 firstname TEXT,
 lastname TEXT,
 email VARCHAR,
 rating DECIMAL,
 contractor BOOLEAN,
 specialties TEXT [],
 certifications TEXT [],
 tools TEXT [],
 jobs_completed INTEGER DEFAULT 0
);


ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (id);

CREATE TABLE reviews (
 id BIGSERIAL,
 client_id INTEGER,
 contractor_id INTEGER,
 rating DECIMAL,
 body VARCHAR,
 date DATE
);


ALTER TABLE reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);

CREATE TABLE jobsPosted (
 id BIGSERIAL,
 client_id INTEGER,
 title VARCHAR,
 specialties TEXT [],
 description VARCHAR,
 price_per_hour INTEGER,
 completed BOOLEAN,
 contractor_id INTEGER DEFAULT 0,
 date DATE
);


ALTER TABLE jobsposted ADD CONSTRAINT jobsPosted_pkey PRIMARY KEY (id);

CREATE TABLE messages (
 id BIGSERIAL,
 from_id INTEGER,
 to_id INTEGER,
 body VARCHAR,
 date TIMESTAMP WITH TIME ZONE
);


ALTER TABLE messages ADD CONSTRAINT messages_pkey PRIMARY KEY (id);

CREATE TABLE sessions (
 id BIGSERIAL,
 user_id INTEGER,
 cookie VARCHAR,
 user_email VARCHAR
);


ALTER TABLE sessions ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);

ALTER TABLE reviews ADD CONSTRAINT reviews_client_id_fkey FOREIGN KEY (client_id) REFERENCES users(id);
ALTER TABLE reviews ADD CONSTRAINT reviews_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES users(id);
ALTER TABLE jobsposted ADD CONSTRAINT jobsposted_client_id_fkey FOREIGN KEY (client_id) REFERENCES users(id);
ALTER TABLE messages ADD CONSTRAINT messages_from_id_fkey FOREIGN KEY (from_id) REFERENCES users(id);
ALTER TABLE messages ADD CONSTRAINT messages_to_id_fkey FOREIGN KEY (to_id) REFERENCES users(id);
ALTER TABLE sessions ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

-- Command for executing this file into your local psql
-- psql -h localhost -d postgres -U [your username] -f ./schema.SQL