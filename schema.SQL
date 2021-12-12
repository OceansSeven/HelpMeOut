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
-- ALTER TABLE jobsPosted ADD CONSTRAINT jobsPosted_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES users(id);
ALTER TABLE jobsposted ADD CONSTRAINT jobsposted_client_id_fkey FOREIGN KEY (client_id) REFERENCES users(id);
ALTER TABLE messages ADD CONSTRAINT messages_from_id_fkey FOREIGN KEY (from_id) REFERENCES users(id);
ALTER TABLE messages ADD CONSTRAINT messages_to_id_fkey FOREIGN KEY (to_id) REFERENCES users(id);
ALTER TABLE sessions ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


INSERT INTO users (company, password, salt, firstname, lastname, email, rating, contractor, specialties) VALUES ('bigPapi', 'password', '1234', 'Josh', 'Elder', 'jelds@hotmail.com', 1.2, TRUE, ARRAY ['pipes']);
INSERT INTO users (company, password, salt, firstname, lastname, email, rating, contractor, specialties) VALUES ('potatoMan', 'password', '1234', 'Samwise', 'Gamgee', 'rickitydickity@hotmail.com', 5, FALSE, ARRAY ['potatoes']);
INSERT INTO users (company, password, salt, firstname, lastname, email, rating, contractor, specialties) VALUES ('silkWorm', 'password', '1234', 'Ron', 'Jones', 'smooth@hotmail.com', 5, TRUE, ARRAY ['plumbing']);
INSERT INTO users (company, password, salt, firstname, lastname, email, rating, contractor, specialties) VALUES ('Rockies', 'password', '1234', 'Elvin', 'Sims', 'rockbottom@hotmail.com', 5, TRUE, ARRAY ['electrical']);
INSERT INTO users (company, password, salt, firstname, lastname, email, rating, contractor, specialties) VALUES ('aces', 'password', '1234', 'Jan', 'Jamone', 'aces@hotmail.com', 5, TRUE, ARRAY ['HVAC']);
INSERT INTO users (company, password, salt, firstname, lastname, email, rating, contractor, specialties) VALUES ('diamonds', 'password', '1234', 'Sally', 'Selseeshell', 'diamonds@hotmail.com', 5, TRUE, ARRAY ['Snow/Waste Removal']);
INSERT INTO reviews (client_id, contractor_id, rating, body, date) VALUES (2, 1, 1.2, 'All my questions got punted to the end', '1980-01-01');
INSERT INTO jobsposted (client_id, title, specialties, description, price_per_hour, completed, contractor_id, date) VALUES (2, 'Clean my potatoes', ARRAY ['pipes'], 'I need someone to come clean my potatoes', 20, FALSE, 0, '1980-01-02');
INSERT INTO jobsposted (client_id, title, specialties, description, price_per_hour, completed, contractor_id, date) VALUES (3, 'Help please', ARRAY ['pipes'], 'help im dying', 10, FALSE, 0, '2001-01-30');
INSERT INTO jobsposted (client_id, title, specialties, description, price_per_hour, completed, contractor_id, date) VALUES (4, 'dingle dangle', ARRAY ['pipes'], 'theres some dingle dangles everywhere', 15, FALSE, 0, '2012-12-12');
INSERT INTO jobsposted (client_id, title, specialties, description, price_per_hour, completed, contractor_id, date) VALUES (5, 'solomon v', ARRAY ['pipes'], 'my skis broke', 4, FALSE, 0, '1971-01-02');
INSERT INTO jobsposted (client_id, title, specialties, description, price_per_hour, completed, contractor_id, date) VALUES (6, 'bringing down the house', ARRAY ['pipes'], 'boom boom pow', 100, FALSE, 0, '1962-01-12');
INSERT INTO jobsposted (client_id, title, specialties, description, price_per_hour, completed, contractor_id, date) VALUES (3, 'there goes the water', ARRAY ['pipes'], 'its really wet', 30, FALSE, 0, '2021-01-02');
INSERT INTO messages (from_id, to_id, body, date) VALUES (1, 2, 'I can clean ur potatoes', '1980-01-01');
INSERT INTO messages (from_id, to_id, body, date) VALUES (2, 1, 'Please clean my potatoes', '1980-01-01');


-- Command for executing this file into your local psql
-- psql -h localhost -d postgres -U [your username] -f ./schema.SQL

