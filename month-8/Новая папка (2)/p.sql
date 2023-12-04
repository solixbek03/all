create database exam8;
\c exam8;

drop table cascode users;
create table users(
  userId serial primary key,
  username varchar(32),
  password varchar(60),
  gander varchar(6)
);

drop table cascode univercity;
create table univercity(
  univerId serial primary key,
  univerTitle varchar
);

insert into users(username, password, gander) values('solixbek', 'asdfds', 'male'),('solihbek', 'asdfds', 'male');

insert into univercity(univerTitle) values('super mega'),('super');

drop table cascode fackultet;
create table fackultet(
  fackultetId serial primary key,
  fackultetTitle varchar,
  fackultetBody varchar,
  univerId int references univercity(univerId),
  userId int references users(userId)
);

insert into fackultet(fackultetTitle, fackultetBody, univerId, userId) values('jahon', 'adsadsa', 1, 2),('jahon', 'adsadsa', 2, 1), ('jahon', 'adsadsa', 1, 1);


create table score(
  scoreId serial primary key,
  scoreMax int,
  score int,

)


select  * from fackultet 
NATURAL JOIN users as u
NATURAL JOIN univercity as univer;


