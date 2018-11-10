### React Tryout

#### Backend  - **Express** API (in JS)
#### Frontend - **React** (in JSX)
#### Frontend Design - Twitter Bootstrap
#### Database - Postgres + Sequelize ORM (_Didn't really enjoy Sequelize_)

### Extract & Try This

##### DB Setup
``` sh 
$ touch backend/dbconn_old/dbKeys.js
```
Update the file accordingly : 

  ```module.exports = <YOUR_PG_DB_URI>``` 


##### Run App
- NPM
``` sh
$ cd reactpgnodeapp
$ npm run install_all
$ npm run devmode
```
or, 

- Yarn 
``` sh
$ cd reactpgnodeapp
$ yarn install && cd react_node_express_app && yarn install && cd ..
$ yarn run server

// Open Another Tab
$ cd react_node_express_app && yarn start
```



