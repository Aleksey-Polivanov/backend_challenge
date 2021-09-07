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
 #### The First task: coding (10 mins)
     - Start the project according to the instructions 
     - add new table "Products" with fields [ id, name, status, quantity ] and create Many-to-many association with "Users" table
 #### The Second task: coding (10 mins)
     - Connect to our external IP for get Products ( GET: https://porter.gantri.com/api/products )
     - Fill in the new table Products with "Active" products that were returned by the API.
 #### The Third task: theoretical questions (10 mins)
 #### Linting
     - Why do you need it?
     - How to implement it?
     - What standards were used?
 #### Workflow
     - As a candidate sees the ideal process from the emergence and formulation of the problem to its rollout into production?
 #### Team
     - How to work with a local and remote team, resolve conflicts, train developers, solve problems of different time zones, personal desires of developers, quick release releases, and so on. (Of course, there is a Senior who is just writing code - but in general, he is expected to interact with other developers.)
 #### Review code
     - How the candidate organizes it? 
     - How quickly do the tasks go through the code review? 
     - What are the trade-offs between quality and speed.
 #### Application architecture
     - Pros and cons of microservices and monoliths? 
     - What are queues and what does Node.JS have to do with it (big open question)? 
     - How to provide failover in Node.JS?
 #### Node.JS Application Security
     - What can affect? 
     - How to evaluate? 
     - How to fight? 
     - What can be added to CI?
 #### Encryption
     - When to use what types of hashes, public-private keys, salt and all that.
 

