# Examen Project

This repository contains both the frontend and backend for the Examen project.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Clone the Repository](#clone-the-repository)
- [Setup Frontend](#setup-frontend)
- [Setup Backend](#setup-backend)
- [Running the Application](#running-the-application)
- [Running Frontend](#running-frontend)
- [Running Backend](#running-backend)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Structure
examen
│
├── examen-frontend
│ ├── (all frontend files)
│ └── node_modules
├── examen-backend
│ ├── (all backend files)
│ └── node_modules
├── README.md

### Clone the Repository

1. Clone the repository and navigate into the project directory:

    ```sh
    git clone https://github.com/RobinGrit22/examen2.git
    cd examen2
    ```

### Setup Frontend

1. Navigate to the frontend directory:

    ```sh
    cd examen-frontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```


4. Fill in the `.env` file with your API keys and other environment variables.

### Setup Backend

1. Navigate to the backend directory:

    ```sh
    cd ../examen-backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

4. Fill in the `.env` file with your API keys and other environment variables.

## Running the Application

### Running Frontend

1. Navigate to the frontend directory:

    ```sh
    cd examen-frontend
    ```

2. Start the development server:

    ```sh
    npm run dev
    ```

3. Open your browser and go to `http://localhost:5173`.

### Running Backend

1. Navigate to the backend directory:

    ```sh
    cd ../examen-backend
    ```

2. Start the backend server:

    ```sh
    npm start
    ```
