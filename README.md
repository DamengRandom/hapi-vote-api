# Create A Simple Hapi API with MongoDB (localhost)

### (Show time ~~) ###


### Prepare 📝📝📝

- Step 1: install npm packages

```js
npm install
or
npm i
```

- Step 2: setup local mongodb-community environment

```js
brew install mongodb-community
brew services start mongodb-community
```

- Step 4: create local mongo database name, table name and mock data 

```js
show dbs // show all existing databases
use votedb // `votes` is the database name we want to define
show collections // right now should be empty because we haven't create table and data yet
// then use `insertOne` to create your first mock mongodb record
db.votes.find() // after created, you can find the record you just created
```

### Launch 🚀🚀🚀

- Start App:

```js
npm start
or
npm run start
```

- Then, open Postman:

```js
do action POST for API: localhost:5375/vote
witg body of 
<pre>
  {
    "ipAddr": "0.1.1.1",
    "reason": "vue is great !!",
    "team": "vue"
  }
</pre>
do action GET for API: localhost:5375/votes
```


### End of journey 🏃‍♂️🏃‍♀️👟
```js
brew services stop mongodb-community
```

### References 👊👊👊
1. <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/" target="_blank">Install Guide for `mongodb-community`</a>


Thanks for reading ~~
