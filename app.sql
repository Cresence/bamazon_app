DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10),

    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Banana', 'Food', 0.50, 500);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Monopoly', 'Toys/Games', 10.99, 50);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Yamaha 88-Key Digital Piano', 'Musical Instrument', 559.99, 15);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('500 Page Composition Notebook', 'Office', 2.99, 100);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('MySQL for Dummies', 'Education', 49.99, 10);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('3-Piece Patio Set', 'Furniture', 79.99, 5);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('The Big Day (Chance The Rapper)', 'CD/DVD/Blu-Ray', 11.99, 50);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('TCL 32" 4K Television', 'Electronics', 299.99, 100);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('30 Piece Mixed Plastic Utensils', 'Kitchen', 3.99, 200);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('"Friends" T-Shirt', 'Apparel', 9.99, 30);