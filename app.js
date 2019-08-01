require("dotenv").config();
const keys = require('./keys.js');
const inquirer = require('inquirer');
const mysql = require('mysql');
const access = keys.access;

const bidAsk = async () => {
    const question =  await inquirer.prompt([
        {
            name:"bid",
            message:"What item do you want to bid on?"
        }
    ])

    const answer = question.bid;
    console.log(answer);
}

// bidAsk();

const bidPost = async () => {
    const question = await inquirer.prompt([
        {
            name:"money",
            message:"What amount do you want to input?",
            // validate: function validateNumber(money) {
            //     if (isNaN(money)){
            //         return 'Not a number'
            //     }
            //     return money
            // }
        }
    ])

    const answer = question.money;

    function validateNumber(answer) {
            if (isNaN(answer)){
                console.log('Not a number');
                // bidPost();
            }
            return answer
        }
    console.log(`You've successfully bid $${answer}!`);
    validateNumber(answer);
}


// bidPost();


// const connection = mysql.createConnection({
//   host: 'localhost',
//   // Your port; if not 3306
//   port: 3306,
//   // Your username
//   user: 'root',
//   // Your password
//   password: '@7rnO9Ej',
//   database: 'bamazon_db',
// });

const connection = mysql.createConnection(access)

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    readProducts();
    // connection.end();
//   createProduct();

});

// function createProduct() {
//   console.log('Inserting a new product...\n');
//   var query = connection.query(
//     'INSERT INTO products SET ?',
//     {
//       flavor: 'Rocky Road',
//       price: 3.0,
//       quantity: 50,
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' product inserted!\n');
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     },
//   );

  // logs the actual query being run
//   console.log(query.sql);
// }

const updateProduct = () => {
  console.log('Updating database...\n');
  const query = connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        quantity: 100,
      },
      {
        flavor: 'Rocky Road',
      },
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products updated!\n');
      // Call deleteProduct AFTER the UPDATE completes
    //   deleteProduct();
    },
  );

  // logs the actual query being run
  console.log(query.sql);
}

const deleteProduct = () => {
  console.log('Deleting all strawberry icecream...\n');
  connection.query(
    'DELETE FROM products WHERE ?',
    {
      flavor: 'strawberry',
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products deleted!\n');
      // Call readProducts AFTER the DELETE completes
    //   readProducts();
    },
  );
}

const readProducts = () => {
  console.log('Loading all products...\n');
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}