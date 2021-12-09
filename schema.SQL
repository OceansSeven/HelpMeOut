CREATE TABLE users (
 id BIGSERIAL,
 username VARCHAR,
 password VARCHAR,
 salt VARCHAR,
 firstName TEXT,
 lastName TEXT,
 email VARCHAR,
 rating DECIMAL,
 specialties TEXT []
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
 job_id INTEGER
);


ALTER TABLE jobsAccepted ADD CONSTRAINT jobsAccepted_pkey PRIMARY KEY (id);

CREATE TABLE jobsPosted (
 id BIGSERIAL,
 client_id INTEGER,
 name VARCHAR,
 type TEXT [],
 description VARCHAR,
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
ALTER TABLE jobsAccepted ADD CONSTRAINT jobsAccepted_job_id_fkey FOREIGN KEY (job_id) REFERENCES jobsPosted(id);
ALTER TABLE jobsPosted ADD CONSTRAINT jobsPosted_client_id_fkey FOREIGN KEY (client_id) REFERENCES users(id);
ALTER TABLE messages ADD CONSTRAINT messages_from_id_fkey FOREIGN KEY (from_id) REFERENCES users(id);
ALTER TABLE messages ADD CONSTRAINT messages_to_id_fkey FOREIGN KEY (to_id) REFERENCES users(id);
ALTER TABLE sessions ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);