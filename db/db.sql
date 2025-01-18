-- Creating the database
CREATE DATABASE tasks_express_db;

-- Using the database
USE tasks_express_db;

-- Creating the table
CREATE TABLE tasks(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)