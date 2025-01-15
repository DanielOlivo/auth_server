create table users (
    id serial not null primary key,
    email varchar(255) not null unique,
    password varchar(500) not null,
    token varchar(500) 
)