# flixxit

This repository contains the source code for both the frontend and backend of the project. The frontend handles the user interface, while the backend manages the API implementation.

## Project Structure


## Frontend

The frontend is responsible for rendering the user interface and making requests to the backend API. To set up and run the frontend, follow the steps below:

### Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
2. **Add environmental variables:**

	Create a `.env` file in the `frontend` directory and add the following environment variables:

	```env
	VITE_TMDB_API_KEY=your_tmdb_api_key_here
	VITE_API_BASE_URL=http://localhost:8080
*VITE_TMDB_API_KEY*: Your API key for TMDB to fetch movie details.
*VITE_API_BASE_URL*: The base URL of the backend, typically http://localhost:8080 if running locally.
3. **Install dependencies::**
	Before running the project, ensure that all dependencies are installed:

	npm install

4. **Run the development server(frontend):**

	To start the development server, run the following command:
   ```bash
	npm run dev				
The application will be accessible at the URL provided by the command output, typically http://localhost:5173.

## BackEnd
1. **Navigate to the frontend directory:**
   ```bash
   cd backend
2. **Add environmental variables:**

	Create a `.env` file in the `frontend` directory and add the following environment variables:

	```env
	DB=your_mongodb_connection_here
	JWT_PRIVATE_KEY=your_private_key
	SALT = 10
3. **Install dependencies::**
	Before running the project, ensure that all dependencies are installed:
	 ```bash
	npm install
4. **Run the development server(backend):**
	```bash
	npm start
The service will be accessible at the URL provided by the command output, typically http://localhost:8080.

## Deployment

1.	Application is deployed in the URL https://flixxit-ui-bs9v.onrender.com.
2.	Once you access the application signup.
3.	Loginto the application
4.	You will be redirect to the movies page. where we can see different kind of movies based on category and if 	you hover on the movie a video will be displayed. on the hover you can see a play button. once you click on play button it will be redirect to the player.
5.	In player, you have an option to play, pause, skip, auto and hd videos.
6.	Watch list page will show the added movies or tv shows in watch list. we can delete from watch list aswell.
7.	About page will show the details of flixxit.
8.	Subscription page will show plans and if you click on pay it will show the end date of subscription.
9.	Profile page will show the details of the user profile.
10. You can logout of the application by clicking on logout.	

	




