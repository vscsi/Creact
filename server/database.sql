CREATE TABLE task(
id serial PRIMARY KEY,
task_name VARCHAR(255) NOT NULL,
task_content VARCHAR(1000) NOT NULL,
task_deadline timestamp NOT NULL,
task_user VARCHAR(10)
);