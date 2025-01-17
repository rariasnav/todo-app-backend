# ToDo Backend

This is the backend of the ToDo application, built with TypeScript, Node.js, Express, and MongoDB.

## Features

- User authentication using JWT
- Task management:
  - Create, Read, Update, Delete tasks
  - Tasks are tied to authenticated users
- Validation using Zod
- Unit tests for task creation and CRUD operations

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **TypeScript**: Static typing
- **MongoDB**: Database
- **JWT**: JSON Web Token for authentication
- **Zod**: Data validation
- **Jest**: Testing framework

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB instance running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-backend.git
   cd todo-backend

2. Install dependencies:
    $ npm install

3. Create an .env file:
   $ cp .env.test .env


Update the environment variables:
-   PORT=5000
-   MONGO_URI=<Your MongoDB URI>
-   JWT_SECRET=<Your JWT Secret>

## Running the Server

1. Start the development server:
    $ npm run dev

2. Start the production server:
    $ npm start

## Running Tests
    To run unit tests:
        $ npm test

##  API Endpoints
Method	Endpoint	    Description
POST	/api/auth/login	Login user
POST	/api/todos	    Create a new task
GET	    /api/todos	    Retrieve all tasks
GET	    /api/todos/:id	Retrieve a task by ID
PUT	    /api/todos/:id	Update a task by ID
DELETE	/api/todos/:id	Delete a task by ID
