DROP DATABASE IF EXISTS helpmeout;

CREATE DATABASE helpmeout;

\c helpmeout;

CREATE TABLE users (
 id BIGSERIAL,
 company VARCHAR,
 password VARCHAR,
 salt VARCHAR,
 firstName TEXT,
 lastName TEXT,
 email VARCHAR,
 rating DECIMAL,
 contractor BOOLEAN,
 specialties TEXT [],
 certifications TEXT [],
 tools TEXT []
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

CREATE TABLE jobsAccepted (
 id BIGSERIAL,
 contractor_id INTEGER,
 jobPosted_id INTEGER
);


ALTER TABLE jobsAccepted ADD CONSTRAINT jobsAccepted_pkey PRIMARY KEY (id);

CREATE TABLE jobsPosted (
 id BIGSERIAL,
 client_id INTEGER,
 title VARCHAR,
 specialties TEXT [],
 description VARCHAR,
 price_per_hour INTEGER,
 completed BOOLEAN,
 date DATE
);


ALTER TABLE jobsPosted ADD CONSTRAINT jobsPosted_pkey PRIMARY KEY (id);

CREATE TABLE messages (
 id BIGSERIAL,
 from_id INTEGER,
 to_id INTEGER,
 body VARCHAR,
 date DATE
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
ALTER TABLE jobsAccepted ADD CONSTRAINT jobsAccepted_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES users(id);
ALTER TABLE jobsAccepted ADD CONSTRAINT jobsAccepted_jobPosted_id_fkey FOREIGN KEY (jobPosted_id) REFERENCES jobsPosted(id);
ALTER TABLE jobsPosted ADD CONSTRAINT jobsPosted_client_id_fkey FOREIGN KEY (client_id) REFERENCES users(id);
ALTER TABLE messages ADD CONSTRAINT messages_from_id_fkey FOREIGN KEY (from_id) REFERENCES users(id);
ALTER TABLE messages ADD CONSTRAINT messages_to_id_fkey FOREIGN KEY (to_id) REFERENCES users(id);
ALTER TABLE sessions ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


INSERT INTO users (company, password, salt, firstName, lastName, email, rating, contractor, specialties) VALUES ('bigPapi', 'password', '1234', 'Josh', 'Elder', 'jelds@hotmail.com', 1.2, FALSE, ARRAY ['pipes']);
INSERT INTO users (company, password, salt, firstName, lastName, email, rating, contractor, specialties) VALUES ('potatoMan', 'password', '1234', 'Samwise', 'Gamgee', 'rickitydickity@hotmail.com', 5, FALSE, ARRAY ['potatoes']);
INSERT INTO reviews (client_id, contractor_id, rating, body, date) VALUES (2, 1, 1.2, 'All my questions got punted to the end', '1980-01-01');
INSERT INTO jobsPosted (client_id, title, specialties, description, completed, date) VALUES (2, 'Clean my potatoes', ARRAY ['pipes'], 'I need someone to come clean my potatoes', TRUE, '1980-01-02');
INSERT INTO jobsAccepted (contractor_id, jobPosted_id) VALUES (1, 1);
INSERT INTO messages (from_id, to_id, body, date) VALUES (1, 2, 'I can clean ur potatoes', '1980-01-01');
INSERT INTO messages (from_id, to_id, body, date) VALUES (2, 1, 'Please clean my potatoes', '1980-01-01');


-- Command for executing this file into your local psql
-- psql -h localhost -d postgres -U [your username] -f ./schema.sql
