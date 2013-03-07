connect-mongostore
==================

connect-mongostore is session store for Connect with MongoDb backend. 

## Requirements ##
MongoDb 2.2 or higher

## Usage ##
No need to run npm install, just copy mongoStore.js and put it somewhere in your application folder.  

	var connect =require('connect'),
		MongoStore = require('./mongoStore')(connect) //change this to path of mongoStore.js
    
	connect()
		.use(connect.session({ store: new MongoStore(options), secret: 'my secret' }))


## Options ##
- host : database server. The default is '127.0.0.1'
- port: database port. The default is 27017
- db : database name. 
- collName : collection name. The default is 'sessions'
- user : database user
- password: user's password
- expire : minimum time before session is expired. Please note that the session expiration utilizes TTL feature of mongoDb. 


   