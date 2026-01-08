# GPU List
## Table of contents
  - [About](#about)
  - [Starting the web app](#starting-the-web-app)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Navigating the UI](#navigating-the-ui)
    - [Main UI](#main-ui)
    - [Alternative UI](#alternative-ui)
  - [Performing CRUD operations via Backend](#performing-crud-operations-via-backend)
  - [Running the web app with Docker](#running-the-web-app-with-docker)
  - [End-to-End (E2E) testing](#end-to-end-e2e-testing)
    - [Manual testing](#manual-testing)
    - [Testing via Docker](#testing-via-docker)
  - [Backend server structure](#backend-server-structure)
  - [Troubleshooting](#troubleshooting)

## About
Single Page Application to store all of your graphics cards data, including the main chip specifications and clock speeds. 

### Features
- Automatically calculates the theoretical performance of a graphics card: FP32(float), Texture Rate, Pixel Rate and Memory Bandwidth.

- Add, delete, search, and list GPUs through a simple frontend UI.

- Built with:
  - Database: MongoDB + Mongoose
  - Backend: Express
  - Frontend: React + Axios

### Screenshots
- Main UI

  <img src="../github/screenshots/gpulist_main-ui.png" alt="GPU List app main UI" width="300"/>

- Alternative UI (Beta)

  <img src="../github/screenshots/gpulist_alt-ui.png" alt="GPU List app alternative UI" width="500"/>


## Prerequisites
- [Node.js](https://nodejs.org)↗ v18.20.5 or higher
- [npm](https://www.npmjs.com)↗ v10.8.2 or higher
- Internet connection to access the remote MongoDB database
- Optional: [Docker](https://www.docker.com)↗ v28.2.1


## Starting the web app
### Frontend
Main UI
  ```bash
  cd ./gpulist/client && npm install && npm run dev
  ```

Alternative UI (Optional)
  ```bash
  cd ./gpulist/alternate-client && npm install && npm run dev
  ```

Vite auto-selects ports: 
  - Main UI → http://localhost:5173
  - Alternative UI → http://localhost:5174

### Backend
Development mode (hot reload with Nodemon)
  ```bash
  cd ./gpulist/server && npm install && npm run dev
  ```

Production mode
  - Build frontend
    ```bash
    cd ./gpulist/client && npm run build && cp -r ./dist ../server
    ```

  - Or Alternative UI
    ```bash
    cd ./gpulist/alternate-client && npm run build && cp -r ./dist ../server
    ```

  - Start the backend server
    ```bash
    npm run start
    ```

  - Access the frontend via the backend URL → http://localhost:3001


## Navigating the UI
### Main UI
#### Displaying a graphics card data
Click the `Show` button for a single card or `Show all data` for all cards.

#### Adding a new graphics card
Click the `Add Graphics Card` button → Fill all the required fields, none can be left empty.

#### Using the search button
Click the `Search` button, search by manufacturer, GPU line or model (e.g., `rtx 40`).

#### Using the index
- Click the `Show index` button → a scrollable card list will be displayed.
- Clicking on a card → the page will scroll to the data table and expand it.
- Click on `Back to Index` button → The table collapses and returns you to the index.

#### Removing a graphics card
Expand the card table → on the bottom, click on the `Delete` → when prompted, click on confirm.

### Alternative UI
- Displaying a graphics card data → click the `View details` button.
- Adding a new graphics card → click on the `Add GPU` button, follow the same steps as the Main UI.
- Using the search button → on the `Search GPUs` bar, type the desired keywords.
- Removing a graphics card → same steps as the Main UI.


## Performing CRUD operations via Backend
Create
  ```
  POST http://localhost:3001/api/gpus
  ```


Body example
  ```json
  {
    "manufacturer": "NVIDIA",
    "gpuline": "GeForce",
    "model": "RTX 5090",
    "cores": 21760,
    "tmus": 680,
    "rops": 176,
    "vram": 32,
    "bus": 512,
    "memtype": "GDDR7",
    "baseclock": 2017,
    "boostclock": 2407,
    "memclock": 28
  }
  ```

Read
  - Fetch all
    ```
    GET http://localhost:3001/api/gpus
    ```

  - Fetch one
    ```
    GET http://localhost:3001/api/gpus/:id
    ```

Update
  - You can update any number of fields
    ```
    PUT http://localhost:3001/api/gpus/:id
    ```

Delete
  ```
  DELETE http://localhost:3001/api/gpus/:id
  ```

## Running the web app with Docker
### Docker Compose
  ```bash
  cd ./gpulist && docker-compose up -d
  ```

### Docker containers
Create a custom network
  ```bash
  docker network create gpulist_webapp-network
  ```

#### Building the images
Main UI
  ```bash
  docker build -t gpulist-webapp-client ./client
  ```

Alternative UI
  ```bash
  docker build -t gpulist-webapp-alt-client ./alternative-client
  ```

Backend
  ```bash
  docker build -t gpulist-webapp-server ./server
  ```

Production Build (Serving a static build of the Frontend)
  ```bash
  cd ./server && docker build -f ./Dockerfile.prod -t gpulist
  ```

#### Running the containers
  - Main UI
    ```bash
    docker run -d --name gpulist-webapp-client --network gpulist_webapp-network -p 5173:80 gpulist-webapp-client
    ```
    
  - Alternative UI
    ```bash
    docker run -d --name gpulist-webapp-alt-client --network gpulist_webapp-network -p 5174:80 gpulist-webapp-alt-client
    ```

  - Backend Server
    ```bash
    docker run -d --env-file .env --name gpulist-webapp-server --network gpulist_webapp-network -p 3001:3001 -ti gpulist-webapp-server
    ```

  - Backend Server (Static production build of the Frontend)
    ```bash
    docker run --name gpulist -p 3001:3001 --env-file ./.env gpulist
    ```

#### Access
  - API → http://localhost:3001/api/gpus
	- Main UI → http://localhost:5173
	- Alternative UI → http://localhost:5174


## End-to-End (E2E) Testing
### Manual testing
Enter the `tests` folder and install the dependencies
  ```bash
  cd ./tests && npm install
  ```

Start the Main UI
  ```bash
  cd ./client && npm run dev
  ```

Start the Backend Server in testing mode
  ```bash
  cd ./server && npm run start:test
  ```

Run Cypress
  - UI mode
    ```bash
    npm run cypress:open
    ```

  - CLI mode
    ```bash
    npm run cypress:cli
    ``` 
  
### Testing via Docker
  ```bash
  docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
  ```

Note: ⚠️ E2E tests were designed for the Main UI only


## Backend server structure
### Folder overview
  ```
  gpuList-web-app/
  ├── index.js             # Entry point of the application
  ├── app.js               # Main Express app setup
  ├── dist/                # Compiled/production-ready files (if applicable)
  │   └── ...
  ├── controllers/         # Handles request logic (Controllers)
  │   └── gpus.js          # GPUs controller: handles API requests related to the GPUs
  ├── models/              # Data models/schema definitions (Models)
  │   └── gpu.js           # Defines the GPU schema/model
  ├── package-lock.json    # Manages exact dependency versions
  ├── package.json         # Project dependencies and scripts
  ├── utils/               # Utility/helper functions
  │   ├── config.js        # Handles environment configurations
  │   ├── logger.js        # Logger setup (for logging requests/errors)
  │   └── middleware.js    # Custom middleware (e.g., authentication, error handling)
  ```

### How Everything Works Together
- index.js – starts Express, imports app.js
- app.js – configures Express, middleware, routes
- controllers/gpus.js – handles GPU API requests
- models/gpu.js – Mongoose schema
- utils/config.js – environment configurations
- utils/logger.js – request/error logging
- utils/middleware.js – custom middleware (auth, error handling)


## Troubleshooting
### Frontend won’t start
Check the versions of Node.js ≥18 & npm ≥10.

---

### Backend cannot connect to DB
Ensure .env file has the correct MongoDB URI.

---

### Port already in use
Kill the process using the port or change the Vite/Express port in config.

---

### Docker containers can’t communicate with each other
Verify the network `gpulist_webapp-network` exists.

---

### E2E tests fail
Confirm the Main UI is running on http://localhost:5173.