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
3. Before starting the server, run command `npm run set_roles` to seed the roles collection in the database.
4. And run command `npm run set_booking_statuses` to seed the booking statuses collection in the database.
5. Run the command `npm run api_tests` to start the server.
6. The API will be accessible at `http://localhost:5000`.
7. API documentation is available at `http://localhost:5000/api-docs`.

### How to run CRUD operations
1. Either you could use Postman or SwaggerUI endpoints using http://localhost:5000/api-docs.
2. Another option is to run command 'npm run api_tests', but before running this command, make sure that your server has been started and MongoDB is connected.

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


### Adding webhooks into github
1. Go to your repository on GitHub.
2. Click on "Settings" in the top menu.
3. In the left sidebar, click on "Webhooks".
4. Click the "Add webhook" button.
5. In the "Payload URL" field, enter the URL where you want to receive the webhook payloads.
6. In the "Content type" dropdown, select "application/json".
7. Choose the events you want to trigger the webhook. You can select "Just the push event" or "Let me select individual events".
8. Click the "Add webhook" button to save your webhook.  