const express = require("express");

const router = express.Router();
const {getUser} = require("../repositories/userRepository");
const {getCurrencyConversion} = require("../repositories/currencyConversionsRepository");
const {client} = require("../database/db");
router.get("/ping", (req, res) => {
  res.send({
    result: "pong"
  })
})
router.get("/transactions/:id", async (req, res) => {
  let userId=req.params.id;
//  let currency_conversion=await getCurrencyConversion({from:sender_details.fromcurrency,to:receiver_details.tocurrency})
  let query_strip_auth = `SELECT transactionid, transactiontype, userid, fulltimestamp, status, senderamount, receiveramount, sendercurrency, receivercurrency, senderid, receiverid FROM public.transactions where userid=${userId}`;
  client.connect()
      .then(() => {
        console.log('Connected to PostgreSQL database');

        // Execute SQL queries here

        client.query(query_strip_auth, (err, result) => {
          if (err) {
            console.error('Error executing query', err);
          } else {
            console.log('Query result:', result.rows);
          }
         res.send(result.rows)
          // Close the connection when done
          client.end()
              .then(() => {
                console.log('Connection to PostgreSQL closed');
              })
              .catch((err) => {
                console.error('Error closing connection', err);
              });

        });
      })
      .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
      });

})

module.exports = router;
