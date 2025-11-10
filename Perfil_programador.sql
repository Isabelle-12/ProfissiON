CREATE USER 'programador'@'localhost' IDENTIFIED BY '1234';

GRANT all
ON profission.* TO 'programador'@'localhost';

FLUSH PRIVILEGES;