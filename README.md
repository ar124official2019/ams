# Attandance Management System (An assessment)
## A simple demo attandance management system

----------------------------------------------

## Running it up

**Please note**: I've used my personal MongoDB cloud to create and interact with database. If you're the person, I'm actually purposing this project to, you should have already received Mongo Connection URI in inbox. Also you don't have to restore MongoDB, because cloud is already up. Only you'll need to add URI to *.env* file. You might also skip adding admin, as I would drop default account already created on cloud's credential to you.

### Setup
1. Clone the repository

    ```sh
    git clone https://github.com/ar124official2019/ams 
    ```

2. Obtain a MongoDB Connection URI
  
    You need to have an access to a MongoDB instance, either local or cloud. Please obtain a connection string URI, so you could install necessary database and further be able to interact with.
  
3. Install sample database

    Use shell to import database to your instance / cluster.
    ```sh
    cd ams/assets # make sure you're in `assets` where backup exists

    # WARNING: It will drop your database `ams` if conincidently you've same name *ams* - Use at Your Own Risk!
    mongorestore --uri $CONNECTION_URI --drop dump
    ```

4. Edit nodejs environment file

    You need to add MongoDB connection URI to NodeJS .env file to make sure it it's connected to some instance for database.

    *ams/server/.env*
    ```
    MONGO_URI="URI-CONNECTION-STRING-HERE"
    ```

5. Install Server NodeJS program dependencies

    ```sh
    cd ams/server # make sure you're in server directory
    npm install
    ```

6. Add an adminstrator user to manage attendance

    You should execute node program `add-admin` residing user *ams/server/bin* to add an adminstrator. This asks for user information and creates adminstrator account.
    ```sh
    cd ams/server # make sure you're in server directory
    node bin/add-admin
    # follow the procedure to create admin account
    ```

7. Start NodeJS Server

    Residing under same server directory, please invoke start npm script start server.
    ```sh
    npm start
    ```

    If server start's successfully, you'd see message 'Connected to database', at-least. Connection may take a few seconds, if remote MongoDB instance.

8. Start Client (Angular) server

    Install client project's dependencies and start server
    ```sh
    # CONDITIONALLY INSTALL GLOBAL ANGUALR CLI - IF NOT INSTALLED
    npm install -g @angular/cli # 

    cd ams/client # make sure you're in client directory
    npm install # install dependencies

    npm start # start development server
    ```

    If Angular development server starts successfully, you shouldd see a success message and local accessible URL, http://localhost:4200 - Hit the link to open local Angular server's site.


## Usage
Application has a rather simple UI. Once loaded, it prompts with

1) A Calendar with current month activated,  use it to swith attendance date.

2) A table populated with dummy students. There are here, attending us. Some are missing? let them be absent. Use buttons under `Present` column to mark a student present. If one is missing, use red button in `Absent` column against that student's row. This will mark him absent. By default, all are marked as absent - you turn on *present* or again *absent*.

3) Last row sum's *present* and *absent* users, and shows their relative percentage.

4) You see that you could Explore attendane sheet, but unable to change one? Yes, you need to login in such a case. Current behaviour is that you're able to click on one, that results in a XHR request with 401 (Unauthenticated) status, in turn that prompts you to login screen. After you login, now you could change presense.

--------------------------------------------

### GOT A QUESTION? Caught a mistake? Please help me make it correct, and I'll help you get it up if you got a problem. Please feel free to reach me back at [pro.se.ahmad.raza.1@gmail.com](mailto:pro.se.ahmad.raza.1@gmail.com)
