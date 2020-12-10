CREATE TABLE users(
   user_id int PRIMARY KEY,
   username varchar(10),
   pw varchar(10)
);

CREATE TABLE projects(
    project_id int PRIMARY KEY,
    project_name varchar(10)  
)

CREATE TABLE project_users(
    id int PRIMARY KEY,
    project_id int,
    user_id int,
    FOREIGN KEY (project_id) REFERENCES projects (project_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);