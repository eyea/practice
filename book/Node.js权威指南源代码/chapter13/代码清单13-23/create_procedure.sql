create procedure insertuser(in username varchar(20),in firstname varchar(20))
begin
    insert into users
    values(
      null,
      username,
      firstname
    );
    select * from users;
end