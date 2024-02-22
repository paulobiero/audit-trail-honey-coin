const {client}=require("../database/db");



async function getCurrencyConversion({from='',to=''}){

    let query_strip_auth = `SELECT conversionrate FROM audit_trail.currencyconversions where fromcurrency='${from}' and tocurrency='${to}' limit 1`;
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
}

module.exports = {
    getCurrencyConversion:getCurrencyConversion
}