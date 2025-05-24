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

-- Create the departments table
CREATE TABLE IF NOT EXISTS departments (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) NOT NULL UNIQUE,
 manager_id INT, -- Optional: Foreign key to the employees table for the department manager
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

-- Create the employees table
CREATE TABLE IF NOT EXISTS employees (
 id INT AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(255) NOT NULL,
 last_name VARCHAR(255) NOT NULL,
 email VARCHAR(255) UNIQUE,
 phone_number VARCHAR(50),
 hire_date DATE,
 job_title VARCHAR(255),
 department_id INT, -- Foreign key to the departments table
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Create the departments table
CREATE TABLE IF NOT EXISTS departments (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) NOT NULL UNIQUE,
 manager_id INT, -- Optional: Foreign key to the employees table for the department manager
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

-- Create the employees table
CREATE TABLE IF NOT EXISTS employees (
 id INT AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(255) NOT NULL,
 last_name VARCHAR(255) NOT NULL,
 email VARCHAR(255) UNIQUE,
 phone_number VARCHAR(50),
 hire_date DATE,
 job_title VARCHAR(255),
 department_id INT, -- Foreign key to the departments table
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(255) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL, -- Store hashed passwords!
 role VARCHAR(50), -- e.g., 'admin', 'hr', 'manager', 'staff', 'md-ceo'
 employee_id INT, -- Link to the employees table if a user is also an employee
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS absences (
 id INT AUTO_INCREMENT PRIMARY KEY,
 employee_id INT NOT NULL, -- Foreign key to the employees table
 start_date DATE NOT NULL,
 end_date DATE NOT NULL,
 absence_type VARCHAR(50), -- e.g., 'sick', 'vacation', 'leave'
 reason TEXT,
 status VARCHAR(50), -- e.g., 'pending', 'approved', 'rejected'
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);