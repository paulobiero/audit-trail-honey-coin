const {client}= require("../database/db") ;


async function createUser({currency='',user=0}){

    let query_strip_auth = `INSERT INTO audit_trail.users(userid,balance,currency) values (${user},0,'')`;
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
async function getUser({id=0}){

    let query_strip_auth = `SELECT userid, balance, currency FROM audit_trail.users where userid=${id} limit 1`;
    return client.connect()
        .then(() => {
            console.log('Connected to PostgreSQL database');

            // Execute SQL queries here

          return client.query(query_strip_auth, (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result:', result.rows);
                }

                // Close the connection when done
                client.end()
                    .then(() => {
                        console.log('Connection to PostgreSQL closed');
                        return result.rows[0];
                    })
                    .catch((err) => {
                        console.error('Error closing connection', err);
                        return result.rows[0];
                    });
            });
        })
        .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err);
        });
}

async function updateBalance({amount=0,userId=0}){

    let query_strip_auth = `UPDATE audit_trail.users SET balance = users.balance + ${amount} WHERE userid = ${userId}`;
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
    getUser:getUser,
    createUser:createUser,
    updateBalance:updateBalance
}