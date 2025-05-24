-- Create the database
CREATE DATABASE IF NOT EXISTS mydatabase;

-- Use the database
USE mydatabase;

-- Create the items table
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create an index on the name column
CREATE INDEX idx_name ON items(name);

-- Create a view of the items table
CREATE VIEW items_view AS
SELECT id, name
FROM items;