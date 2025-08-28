# Notes
## Table of contents
  - [About](#about)
  - [Starting the web app](#starting-the-web-app)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Navigating the UI](#navigating-the-ui)
    - [Logging in](#logging-in)
    - [Adding a note](#adding-a-note)
    - [Marking a note as important or not](#marking-a-note-as-important-or-not)
    - [Showing only the important notes](#showing-only-the-important-notes)
  - [Handling user login and authorization tokens](#handling-user-login-and-authorization-tokens)
  - [Performing CRUD operations on notes through the backend server](#performing-crud-operations-on-notes-through-the-backend-server)
  - [Integration tests](#integration-tests)
  - [Explaning the backend server web app structure](#explaning-the-backend-server-web-app-structure)

## About
Single Page Application to store simple one line notes, being able to also mark each one of them as important or not. The frontend UI supports adding new notes and marking them as important, an user account is required to either see the notes or add new ones. The entire web app's UI will be locked out to non-logged users. This web app uses a MongoDB database, implementing mongoose+express on the backend server and axios on the client side.


## Starting the web app
### Frontend
Navigate to the frontend folder and install the necessary dependencies
  ```
  cd ./notes/frontend && npm install
  ```

Start the frontend with
  ```
  npm run dev
  ```

### Backend
Navigate to the backend folder and install the necessary dependencies
  ```
  cd ./notes/backend && npm install
  ```

Start the backend with
  * On dev mode, using nodemon for hot reloading
    ```
    npm run dev
    ```

  * The production mode uses a static build of the frontend UI
    * First, build the frontend
      ```
      cd ./notes/frontend && npm run build && cp -r ./dist ../server
      ```

    * Then start the server in production mode
      ```
      npm run start
      ```

    * The frontend will be accessible on the same address as the server http://localhost:3001


## Navigating the UI
`!` The frontend does not support removing notes at the time, these type of operation must be done through the backend server only.

### Logging in
On the main page, click on the Log in button and enter the following credentials
  ```
  username: admin
  password: admin
  ```

The notes will be displayed on the web app's UI.

### Adding a note
To add a new note to the list, click on the `new note` button, enter the note's content and press the Enter key or click on the `save` button

### Marking a note as important or not
All notes by default will be classified as non-important, to mark one as important, click on the small button to the right side of the note. Important notes will have the symbol `✗` next to them, non-important ones will have `✔` symbol.

### Showing only the important notes
Click on the `show important` button to filter out all non-important items, click on `show all` to return to the normal notes display


## Handling user login and authorization tokens
To make any HTTP requests to the backend /notes api, an authorization token is required.

Create a new user
  ```
  http POST http://localhost:3001/api/users name="The Admin" username="admin" password="admin"
  ```

Fetching the list of users
  ```
  GET http://localhost:3001/api/notes
  ```

Logging in
  ```
  POST http://localhost:3001/api/login username="admin" password="admin"
  ```

Copy the authorization token, example
  ```
  {
    "name": "The Admin",
    "token": " <authorization token>",
    "username": "admin"
  }
  ```


## Performing CRUD operations on notes through the backend server
Create (the important field is optional, not setting it defaults to false)
  ```
  POST http://localhost:3001/api/notes Authorization:"Bearer  <authorization token>" content="My first note"
  ```

Read
  * Fetch all
    ```
    GET http://localhost:3001/api/notes
    ```

  * Fetch a specific id
    ```
    GET http://localhost:3001/api/notes/:id
    ```

Update (you can modify the content, important or both fields at each request)
  ```
  PUT http://localhost:3001/api/notes/:id Authorization:"Bearer <authorization token>" content="My modified note"

  OR

  PUT http://localhost:3001/api/notes/:id Authorization:"Bearer <authorization token>" important=true

  OR

  PUT http://localhost:3001/api/notes/:id Authorization:"Bearer <authorization token>" content="My modified note" important=true
  ```

Delete
  ```
  DELETE http://localhost:3001/api/notes/:id
  ```


## Integration tests
These are backend integration tests using supertest. They send real HTTP requests against the Express app and verify the responses and database state. They are sometimes considered “end-to-end” tests for the backend, since they cover the full request/response flow without mocks. They utilize a test database on MongoDB.

### Running the tests
Start the backend server in testing mode
  ```
  cd ./notes/backend && npm run start:test
  ```

For the main notes API test
  ```
  npm run test
  ```

The users API test
  ```
  cd ./notes/backend && npm run test ./tests/user_api.test.js
  ```


## Explaning the backend server web app structure
### Folder structure
```
notes-web-app/
├── index.js            # Entry point of the application
├── app.js              # Main Express app setup
├── dist/               # Compiled/production-ready files (if applicable)
│   └── ...
├── controllers/        # Handles request logic (Controllers)
│   └── notes.js        # Notes controller: handles API requests related to notes
├── models/             # Data models/schema definitions (Models)
│   └── note.js         # Defines the Note schema/model
├── package-lock.json   # Manages exact dependency versions
├── package.json        # Project dependencies and scripts
├── utils/              # Utility/helper functions
│   ├── config.js       # Handles environment configurations
│   ├── logger.js       # Logger setup (for logging requests/errors)
│   └── middleware.js   # Custom middleware (e.g., authentication, error handling)
```


### How Everything Works Together
1. index.js
    * The main entry point.
    * Starts the Express server.
    * Imports app.js to configure the application.

2. app.js
    * Sets up the Express app.
    * Connects routes, middleware, and configurations.
    
3. controllers/notes.js
    * Handles incoming HTTP requests related to notes (CRUD operations).
    * Calls functions from models/note.js to interact with the database.

4. models/note.js
    * Defines the data structure for notes (e.g., Mongoose schema if using MongoDB).
    
5. utils/config.js
    * Stores configuration settings (e.g., environment variables, database URIs).

6. utils/logger.js
    * Manages logging (e.g., request logs, error logs).

7. utils/middleware.js
    * Contains Express middleware functions (e.g., error handling, authentication).
