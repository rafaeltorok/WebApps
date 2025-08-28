# Blogs List
## Table of contents
  - [About](#about)
  - [Starting the web app](#starting-the-web-app)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Navigating the UI](#navigating-the-ui)
  - [Handling user login and authorization tokens](#handling-user-login-and-authorization-tokens)
  - [Performing CRUD operations on blogs through the backend server](#performing-crud-operations-on-blogs-through-the-backend-server)


## About
Single Page Application to store your personal list of blogs. You can add, remove and like the blogs from the list. The backend supports all CRUD operations, through the frontend users are able to add, like and remove blogs. An account is required to perform any operation on the app, since the backend server requires an authorization token to perform such operations. All users have access to all blogs available on the MongoDB database.

<img src="../github/screenshots/blogslist.png" alt="Blogs List app UI" width="300"/>

## Starting the web app
### Frontend
Navigate to the frontend folder and install the necessary dependencies
  ```
  cd ./blogslist/frontend && npm install
  ```

Start the frontend with
  ```
  npm run dev
  ```

### Backend
Navigate to the backend folder and install the necessary dependencies
  ```
  cd ./blogslist/backend && npm install
  ```

Start the backend with
  * On dev mode, using nodemon for hot reloading
    ```
    npm run dev
    ```

  * On production mode, using basic Node.js to start the server
    ```
    npm run start
    ```

## Navigating the UI
On the main page, click on the Log in button and enter the following credentials
  ```
  username: root
  password: admin
  ```

The list of blogs will be displayed on the web app's UI.

To add a new blog, click on the `add blog` button, enter the Title, Author and blog URL on the specified fields, in a format, for example
  ```
  Title: Admin's Place
  Author: Admin
  URL: https://superuser.root.com
  ```

All blogs will have a default of 0 likes, you can like any of them as many times as you want, the more likes, the higher the blog will displayed on the page, the default ordering method is listed by the most liked blogs from top to bottom.

To like a blog, simply click on the `show` button to display a blog's full info table and hit `like`.

## Handling user login and authorization tokens
To make any HTTP requests to the backend /blogs api, an authorization token is required.

Create a new user
  ```
  POST http://localhost:3003/api/users username="admin" name="The Admin" password="admin"
  ```

Fetching the list of users
  ```
  GET http://localhost:3003/api/users
  ```

Logging in
  ```
  POST http://localhost:3003/api/login username="admin" password="admin"
  ```

Copy the authorization token, example
  ```
  {
    "name": "The Admin",
    "token": " <authorization token>",
    "username": "admin"
  }
  ```

## Performing CRUD operations on blogs through the backend server
Create (The like field is obligatory when making direct server requests)
  ```
  POST http://localhost:3003/api/blogs Authorization:"Bearer  <authorization token>" title="Random Blog" author="anonymous" url="https://random-blog.com" likes=1
  ```

Read
  * Fetch all
    ```
    GET http://localhost:3003/api/blogs
    ```

  * Fetch a specific id
    ```
    GET http://localhost:3003/api/blogs/:id
    ```

Update (The backend can only update the number of likes)
  ```
  PUT http://localhost:3003/api/blogs/:id Authorization:"Bearer <authorization token>" likes=1000
  ```

Delete
  ```
  DELETE http://localhost:3003/api/blogs/:id
  ```
