CREATE DATABASE ta_practice_db;
CREATE TABLE movies (movie_id INT AUTO_INCREMENT, title VARCHAR(50), director VARCHAR(50), year INT, PRIMARY KEY(movie_id));
CREATE TABLE reviews (movie_id INT, review VARCHAR(255), FOREIGN KEY(movie_id) REFERENCES movies(movie_id));