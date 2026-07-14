CREATE DATABASE db_employee;
USE db_employee;
CREATE TABLE tbl_employee (
e_id int PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 age INT NOT NULL ,
 role VARCHAR(255) NOT NULL,
 salary DECIMAL);

/*CREATE DATABASE IF NOT EXISTS db_employee;   (!!New database, change with caution!!)
USE db_employee;
CREATE TABLE tbl_employee (
e_id int PRIMARY KEY AUTO_INCREMENT,
password VARCHAR(255) NOT NULL,
 name VARCHAR(255) NOT NULL,
 age INT NOT NULL ,
 role VARCHAR(255) NOT NULL,
 emp_status VARCHAR(255) NOT NULL,
 salary DECIMAL);*/

 /*CREATE DATABASE IF NOT EXISTS db_employee;  (updated database, change with caution!!)
USE db_employee;
CREATE TABLE tbl_employee (
e_id int PRIMARY KEY AUTO_INCREMENT,
password VARCHAR(255) NOT NULL,
 name VARCHAR(255) NOT NULL,
 age INT NOT NULL ,
 role VARCHAR(255) NOT NULL,
 emp_status VARCHAR(255) NOT NULL,
 salary DECIMAL);
 
INSERT INTO tbl_employee (password, name, age, role, emp_status, salary)
VALUES 
('pass123', 'John Doe', 28, 'Waiter', 'Available', 45000.00),
('pass456', 'Jane Smith', 32, 'Chef', 'Available', 60000.00),
('pass789', 'Mike Brown', 25, 'Cashier', 'Unavailable', 40000.00);

ALTER TABLE tbl_employee ADD COLUMN assigned_order_id INT NULL;

DESCRIBE tbl_employee;*/

CREATE DATABASE db_tables;
USE db_tables;
CREATE TABLE tbl_tables (
table_id INT PRIMARY KEY AUTO_INCREMENT,
 table_status VARCHAR(255) NOT NULL,
 assigned_order_id INT);

CREATE DATABASE db_orders;
USE db_orders;
CREATE TABLE tbl_orders (
order_id INT PRIMARY KEY AUTO_INCREMENT,
 order_status VARCHAR(255) NOT NULL,
 item_1_id INT,
 item_2_id INT,
 total_price DECIMAL);
 
CREATE DATABASE db_items;
USE db_items;
CREATE TABLE tbl_items (
item_id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 ingredient_1_id INT,
 ingredient_1_amt INT,
 ingredient_2_id INT,
 ingredient_2_amt INT,
 price DECIMAL);
 
CREATE DATABASE db_ingredients;
USE db_ingredients;
CREATE TABLE tbl_ingredients (
ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 quantity INT);
 
// Current DB that is being used for the project.

CREATE DATABASE IF NOT EXISTS db_tables;
USE db_tables;

CREATE TABLE tables (
    table_id INT PRIMARY KEY AUTO_INCREMENT,
    table_status VARCHAR(20) NOT NULL,
    assigned_order_id INT
);

INSERT INTO tables (table_status, assigned_order_id) 
VALUES ('Free', NULL);

SELECT * FROM tables;

ALTER TABLE tables ADD COLUMN assigned_employee_id INT NULL;

SHOW TABLES;


CREATE DATABASE db_ingredients;
USE db_ingredients;
CREATE TABLE tbl_ingredients (
ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 quantity INT);
 
INSERT INTO tbl_ingredients (name, quantity) VALUES
('Rice', 50),
('Chicken', 30),
('Potato', 100),
('Tomato', 80),
('Onion', 120),
('Garlic', 40),
('Cheese', 25),
('Eggs', 60),
('Flour', 70),
('Milk', 45);


CREATE DATABASE IF NOT EXISTS db_employee;
USE db_employee;
CREATE TABLE tbl_employee (
e_id int PRIMARY KEY AUTO_INCREMENT,
password VARCHAR(255) NOT NULL,
 name VARCHAR(255) NOT NULL,
 age INT NOT NULL ,
 role VARCHAR(255) NOT NULL,
 emp_status VARCHAR(255) NOT NULL,
 salary DECIMAL);
 
INSERT INTO tbl_employee (password, name, age, role, emp_status, salary)
VALUES 
('pass123', 'John Doe', 28, 'Waiter', 'Available', 45000.00),
('pass456', 'Jane Smith', 32, 'Chef', 'Available', 60000.00),
('pass789', 'Mike Brown', 25, 'Cashier', 'Unavailable', 40000.00);

ALTER TABLE tbl_employee ADD COLUMN assigned_order_id INT NULL;

DESCRIBE tbl_employee;


CREATE DATABASE db_orders;
USE db_orders;
CREATE TABLE tbl_orders (
order_id INT PRIMARY KEY AUTO_INCREMENT,
 order_status VARCHAR(255) NOT NULL,
 total_price DECIMAL);
 
 CREATE TABLE tbl_order_items(
    order_id INT,
    item_id INT,
    PRIMARY KEY (order_id, item_id),
    FOREIGN KEY (order_id) REFERENCES db_orders.tbl_orders(order_id),
    FOREIGN KEY (item_id) REFERENCES db_items.tbl_items(item_id)
);

DROP TABLE tbl_orders;


CREATE DATABASE db_items;
USE db_items;
CREATE TABLE tbl_items (
item_id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 ingredient_1_id INT,
 ingredient_1_amt INT,
 ingredient_2_id INT,
 ingredient_2_amt INT,
 price DECIMAL);
 
 select*FROM tbl_items;