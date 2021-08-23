# Backend Challenge
 #### Setup DB
     Install postgreSQL: https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx

     psql -U postgres
     CREATE USER backend_challenge PASSWORD 'backend_challenge';
     ALTER USER "backend_challenge" WITH SUPERUSER CREATEDB CREATEROLE;
     CREATE DATABASE backend_challenge_dev OWNER backend_challenge;     // for development

 ### Commands for start project:
    `npm run server-install` - Install node modules and run migrations,
    `npm run server-start` - Run server, 

# Tasks
 #### The First task for a Junior position (10 mins)
     - Start the project according to the instructions 
     - add new table "Products" with fields [ id, name, status, quantity ] and create Many-to-many association with "Users" table
 #### The Second task for a Middle position (10 mins)
     - Connect to our external IP for get Products ( GET: https://porter.gantri.com/api/products )
     - Fill in the new table Products with "Active" products that were returned by the API.
 #### The Third task for Senior position (10 mins) (WIP)

