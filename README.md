# flixxit

This repository contains the source code for both the frontend and backend of the project. The frontend handles the user interface, while the backend manages the API implementation.

## Project Structure


## Frontend

The frontend is responsible for rendering the user interface and making requests to the backend API. To set up and run the frontend, follow the steps below:

### Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend

2. **Add environment variables:**

Create a .env file:
In the frontend directory, create a .env file and add the following environment variables:

   ```bash
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_API_BASE_URL=http://localhost:8080

*VITE_TMDB_API_KEY*: Your API key for TMDB to fetch movie details.
*VITE_API_BASE_URL*: The base URL of the backend, typically http://localhost:8080 if running locally.

3. **Install dependencies:**

Before running the project, ensure that all dependencies are installed:

   ```bash
      npm install

4. **Run the development server(FrontEnd):**
   ```bash
      npm run dev

The application will be accessible at the URL provided by the command output, typically http://localhost:5173.

