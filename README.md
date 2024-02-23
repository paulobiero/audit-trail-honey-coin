# Mini Challenge 1:  App Optimizer
For this challenge i created a sample angular application to use the package.json provided to test the optimisation of the application

#### 1. Upgrade to the latest angular 17.2.1
#### 2. Upgraded all the dependencies to be compatible with angular 17.2.1
#### 3. Removed duplicate dependencies to make the application lighter ie firebase,crypto-js

To test the implementation we first build the application using
#### 1. run 
``` bash 
cd mini-challenge-1 && npm install && ng serve
```
# Mini Challenge 2: Audit Trail System

For the second challenge we will do a step to step implementation of a transfer transaction since it seems to cover all the requirements

#### Step 1
When we get a request we first get the base currency for the sender and the receiver by using the query below
```sql
SELECT userid, balance, currency FROM public.users where userid=${id} limit 1;
```
#### Step 2
We then get this we use this to get the conversion rates by using the base currency of the sender as fromcurrency and receiver base currency as tocurrency,if they are the same we skip over to step 3
```sql
SELECT conversionrate FROM public.currencyconversions where fromcurrency='${from}' and tocurrency='${to}' limit 1
```
##### Step 3
The conversionrate got from step 2 is used to create a transaction table by multiplying the conversionrate to amount and  put it as  receiveramount and the status as pending or if they are the same currency no conversion rate is needed
```sql
INSERT INTO public.transactions(transactionid, transactiontype, userid, fulltimestamp, status, senderamount, receiveramount, sendercurrency, receivercurrency, senderid, receiverid) values (${transaction_id},'${type}',${userid},${timestamp},'${status}',${senderamount},${recieveramount},'${sendercurrency}','${receivercurrency}',${senderid},${receiverid})
```
#### Step 4
From this point we check if the balance of the senderid is sufficient to complete the transaction if so we complete the payment by the below query,we will use the results from query one to achieve this
```sql 
 UPDATE public.transactions SET status = 'completed' WHERE transactionid=${transactionid};
```
If its insufficient we update it as incomplete
```sql 
 UPDATE public.transactions SET status = 'incomplete' WHERE transactionid=${transactionid};
```

#### Step 5
Finally we update the transaction on the users table on both the sender and receiver
on the sender side we update it as below with the amount set as a negative but on the receiver side we put the amount as positive,we make sure to use the conversion rate to update this in the case where the transaction invlolved different currencies
```sql
UPDATE public.users SET balance = users.balance + ${amount} WHERE userid = ${userId}
```

### Api test
To test the Espress.js api we run the command below
``` bash 
cd mini-challenge-2 && npm install && npm start
```
To get the results the click on the get request below assuming our userid is 10100

http://localhost:3000/transactions/10100



