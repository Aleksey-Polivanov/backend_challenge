# Backend Challenge
 #### Setup DB
     Install postgresSQL: https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx

     psql -U postgres
     CREATE USER backend_challenge PASSWORD 'backend_challenge';
     ALTER USER "backend_challenge" WITH SUPERUSER CREATEDB CREATEROLE;
     CREATE DATABASE backend_challenge_dev OWNER backend_challenge;     // for development
     CREATE DATABASE backend_challenge_test OWNER backend_challenge;    // for testing
 
     # Test env
     NODE_ENV=test npm run sequelize db:migrate
 
     # Development env
     npm run sequelize db:migrate
     ____________________________
     Migrate:
     npm run sequelize db:drop && npm run sequelize db:create && npm run sequelize db:migrate
     
     Remove all migration tables:
     npm run sequelize db:migrate:undo:all

 ### Commands (from root directory):
    `yarn server-install` - Install backend libraries and run migrations,
    `yarn server-start` - Run server, 

 #### PostgreSQL Client for the Mac
 
    https://eggerapps.at/postico/
 
 #### Created Dump from DB
 
    pg_dump backend_challenge_dev > db-backend_challenge-dev.sql


