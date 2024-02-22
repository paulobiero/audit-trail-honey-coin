import client from "../database/db";

async function createTransaction({transaction_id=Math.random(),type='',userid='',timestamp=Date.now(),status='',senderamount=0,recieveramount=0,sendercurrency='',receivercurrency='',senderid=0,receiverid=0}){

    let query_strip_auth = `INSERT INTO audit_trail.transactions(transactionid, transactiontype, userid, fulltimestamp, status, senderamount, receiveramount, sendercurrency, receivercurrency, senderid, receiverid) values (${transaction_id},'${type}',${userid},${timestamp},'${status}',${senderamount},${recieveramount},'${sendercurrency}','${receivercurrency}',${senderid},${receiverid})`;
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
async function getTransactionsByUser(id=0){

    let query_strip_auth = `SELECT transactionid, transactiontype, userid, fulltimestamp, status, senderamount, receiveramount, sendercurrency, receivercurrency, senderid, receiverid FROM audit_trail.transactions where userid=${id}`;
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
                return
            });
        })
        .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err);
        });
}

async function updateBalance(amount=0){

    let query_strip_auth = `UPDATE audit_trail.users SET balance = users.balance + ${amount} WHERE userid = ?`;
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
    createTransaction:createTransaction,
    updateBalance:updateBalance,
    getTransactionsByUser:getTransactionsByUser
}