CREATE DATABASE db_employee;
USE db_employee;
CREATE TABLE tbl_employee (
e_id int PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 age INT NOT NULL ,
 role VARCHAR(255) NOT NULL,
 salary DECIMAL);

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