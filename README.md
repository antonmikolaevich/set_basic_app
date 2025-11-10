### How to clone the repo
1. Open your terminal.
2. Run the command `git clone https://git.epam.com/anton_rak/set_basic_api_js.git`.
3. Navigate to the project directory using `cd your-repo`.

### How to run the app

1. Run the command `npm install` to install all dependencies.
2. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
3. Before starting the server, run node seedRoles.js to seed the roles collection in the database.
4. And run node seedBookingStatuses.js to seed the booking statuses collection in the database.
5. Run the command `npm run api` to start the server.
6. The API will be accessible at `http://localhost:5000`.
7. API documentation is available at `http://localhost:5000/api-docs`.

### How to run CRUD operations
1. Either you could use Postman or SwaggerUI endpoints using http://localhost:5000/api-docs.
2. Another option is to run command 'npm run api', but before running this command, make sure that your server has been started and MongoDB is connected.

### Structure of the project
- `app.js`: The main application file that sets up the Express server and connects to MongoDB.
- `controllers/`: Contains the controller files that handle the business logic for different routes.    
- `models/`: Contains the Mongoose models for the database collections.
- `routes/`: Contains the route definitions for the API endpoints.
- `api_helpers/`: Contains helper functions for making API requests.
- `data/`: Contains example data files for testing the API.

### Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- Swagger for API documentation
- mocha and chai for testing
- Jest for unit testing

### Project Structure
|-- api_helpers/\
|-- controllers/\
|-- coverage/\
|-- crud_tests/\
|-- data/\
|-- models/\
|-- routes/\
|-- swagger/\
|-- unit_tests/\
|-- .env\
|-- .gitignore\
|-- .mocharc.js\
|-- app.js\
|-- jest.config.js\
|-- package-lock.json\
|-- package.json\
|-- README.md\