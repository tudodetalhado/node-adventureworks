node-adventureworks
===================

Example app with node.js Express. A web app with a layered data access to query MS adventureworks database.
It is a study to find a approach for a layered access to abstract away the database. These files are located in the ./data folder (note: outside of the web folder which should represent the web ui).
This is just a personal example application and certainly not ready for production at this stage =)

## Break down
It hast three main javascript modules.
 - sql_db.js
   has the plain database access code. So if you want to switch to mysql for example this would contain all the information how to execute a query
 - repository.js
   this file has all the code regarding the queries and also the mapping to plain javascript objects. This helps to get rid of the database driver agnostic json which will be returned by sql_db.js
 - datas_ervice.js
   at the moment this just pipes through the information but could (or should) have additional business logic.



## Dependencies
it uses:
  - https://github.com/pekim/tedious Tedious to access the SQL SERVER database
  - Express.js for the web ui - https://github.com/visionmedia/express
  - This app accesses SQL SERVERS example data from the AdventureWorks 2008R2 SR1 database which can be downloaded at http://msftdbprodsamples.codeplex.com/releases/view/55926
  
## How to get started...

To start:
  - clone the files
  - run npm install in the main folder
  - run npm install in the web folder
  - set the config in `/web/app.js` to point to your server
  
  for example:
  fiele: web/app.js
  ```javascript
    var config = {
    userName: 'USERNAME',
    password: 'PASSWORD',
    server: 'SERVER',
    options:{
        database: 'AdventureWorks2008R2',
        instanceName:'SQL_SERVER_INSTANCE_NAME'

      }
    };
  ```
  !please note that tedious supports only sql authentication!

after that ....

access the `/web folder` and type 
`npm start`and then browse to `http://localhost:3000`

  
