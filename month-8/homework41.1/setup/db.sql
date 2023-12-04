create database homework41;
\c homework41

drop table users;
create table users(
  id serial,
  username varchar(32),
  password varchar,
  gander  varchar(7),
  age int
);

insert into users(username, password, gander, age) values('solixbek', 'Asd1986597s', 'male', 16);
