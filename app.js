require("dotenv").config();
const keys = require('./keys.js');
const inquirer = require('inquirer');
const mysql = require('mysql');
const access = keys.access;

const connection = mysql.createConnection(access);

const choiceArray = [];
let myCart;

function start () {
    inquirer
      .prompt({
        name: 'buy',
        type: 'list',
        message: 'Would you like to [BUY] an product or [EXIT]?',
        choices: ['BUY', 'CHECKOUT', 'EXIT'],
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.buy === 'BUY') {
          selectItems();
        } 
        else if (answer.buy === 'CHECKOUT') {
          checkOut();
        } 
        else {
          connection.end();
        }
      })
  }
  function readItemsSmall() {
    connection.query('SELECT * FROM products', function (err, results){
      if (err) throw err;
      // console.log(results)
      for (let i = 0; i < results.length; i++) {
        choiceArray.push(results[i].product_name);
      }
      console.log(choiceArray);
        });
    };

function selectItems () {
  connection.query('SELECT * FROM products', function(err, results) {
    // if (err) throw err;
    console.log("Loading products...\n");
    // once you have the items, prompt the user for which they'd like to bid on
    // console.log(results);
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          choices: function() {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: 'What product would you like to [BUY]?',
        },
        {
          name: 'amount',
          type: 'input',
          message: 'How much would you like to [BUY]?'
        }
      ]) .then(function(answer) {
        // get the information of the chosen item
        let chosenItem;
        for (let i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.stock_quantity > parseInt(answer.amount)) {
          let newAmount = chosenItem.stock_quantity-answer.amount;
          console.log('This is an amount: ' + newAmount);
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            'UPDATE auctions SET ? WHERE ?',
            [
              {
                stock_quantity: newAmount,
              },
              {
                item_id: chosenItem.item_id,
              },
            ],
            function(error) {
            //   if (error) throw err;
              console.log('Product purchased successfully!');
              myCart = answer.amount*chosenItem.price;
              start();
            },
          );
        } else {
          // bid wasn't high enough, so apologize and start over
          console.log(`We don't have enough stock to complete that purchase.\nSorry. Try again...`);
          selectItems();
        }
      });
    })
  };

  function checkOut(){
    inquirer.prompt([
      {
        type:'confirm',
        message:`Would you like to checkout? Your total is: ${myCart}`,
        name:'confirm'
      }
    ]).then(function(answer){
      if (answer.confirm === true) {
        console.log('Thank you for your purchase!');
        connection.end();
      } else{
        start();
      }
    })
  }


start();

// readItemsSmall();