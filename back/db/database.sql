CREATE TABLE person(
	id SERIAL PRIMARY KEY,
	nickname VARCHAR(25)
);

CREATE TABLE post(
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	content varchar(255),
	user_id integer,
	foreign key (user_id) references person (id)
);

