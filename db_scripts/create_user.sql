DROP USER IF EXISTS 'cats'@'localhost';
CREATE USER 'cats'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON `cat_database`.* TO 'cats'@'localhost';
FLUSH PRIVILEGES;