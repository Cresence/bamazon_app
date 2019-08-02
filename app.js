require("dotenv").config();
const keys = require('./keys.js');
const inquirer = require('inquirer');
const mysql = require('mysql');
const access = keys.access;

const connection = mysql.createConnection(access);

function start() {
    inquirer
      .prompt({
        name: 'buy',
        type: 'list',
        message: 'Would you like to [BUY] an product or [EXIT]?',
        choices: ['BUY', 'EXIT'],
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.buy === 'BUY') {
          readItems();
        } 
        // else if (answer.postOrBid === 'BID') {
        //   bidAuction();
        // } 
        else {
          connection.end();
        }
      });
  }
  function readItemsSmall() {
    connection.query('SELECT * FROM products', function (err, results){
      if (err) throw err;
      console.log(results)
        });
    };

// function readItems() {
//     connection.query('SELECT * FROM products', function (err, results){
//       if (err) throw err;
//       inquirer
//         .prompt([
//           {
//             name: 'choice',
//             type: 'rawlist',
//             choices: function() {
//               let choiceArray = [];
//               for (let i = 0; i < results.length; i++) {
//                 choiceArray.push(results[i].item_name);
//               }
//               return choiceArray;
//             },
//             message: 'What product would you like to buy?',
//           },
//           {
//             name: 'item_quantity',
//             type: 'input',
//             message: 'How much would you like to item_quantity?',
//           },
//         ])
//         .then(function(answer) {
//           // get the information of the chosen item
//           let chosenItem;
//           for (let i = 0; i < results.length; i++) {
//             if (results[i].item_name === answer.choice) {
//               chosenItem = results[i];
//             }
//           }

//           // determine if item_quantity was high enough
//           if (chosenItem.stock_quantity < parseInt(answer.item_quantity)) {
//             // item_quantity was high enough, so update db, let the user know, and start over
//             connection.query(
//               'UPDATE auctions SET ? WHERE ?',
//               [
//                 {
//                   stock_quantity: stock_quantity-answer.item_quantity,
//                 },
//                 {
//                   item_id: chosenItem.id,
//                 },
//               ],
//               function(error) {
//                 if (error) throw err;
//                 console.log('Product has been successfully saved to your cart!');
//                 start();
//               },
//             );
//           } else {
//             // item_quantity wasn't high enough, so apologize and start over
//             console.log(`We don't have enough of that product to sell at that capacity. Try again...`);
//             start();
//           }
//         });
//     });
// };

// start();

readItemsSmall();