create table users(
    id serial not null primary key,
    username text not null,
    UNIQUE(username), 
    number_of_greetings int not null
);