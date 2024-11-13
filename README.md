
# WorkNest

WorkNest is a robust MERN-stack job application platform designed to provide a responsive and user-friendly interface for job seekers and recruiters alike. Users can easily search for job opportunities and apply directly, while recruiters can post job listings to attract potential candidates.

## Features

- **User Authentication** : Register, login, and logout functionality using JWT tokens.
- **Protected Routes**: Secured routes for authenticated users only.
- **Redux Integration**: Centralized state management with Redux for user data and loading indicators.
- **Responsive Design**: Optimized for various screen sizes.
- **Loading Indicators**: Smooth loading animations using a custom spinner component.
- **Toast Notifications**: User feedback on actions with `react-toastify`.

## Tech Stack

### Frontend
- React with Vite
- Redux (state management)
- React Router (routing)
- Axios (API requests)
- React-Toastify (notifications)
- Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JWT (token-based authentication)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/) 

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mk-manishkumar/worknest.git
   cd worknest
   ```

2. **Set up environment variables**:
   - Create a `.env` file in the root directory with the following content:
     ```env
     MONGO_URI=your_mongo_db_connection_string
     JWT_SECRET=your_jwt_secret
     ```

3. **Install dependencies**:
   ```bash
   # Install server dependencies
   npm install

   # Navigate to client directory and install frontend dependencies
   cd client
   npm install
   ```

4. **Run the application**:
   - In the project root directory, run the following command to start both frontend and backend:
     ```bash
     npm run dev
     ```
   - The app should now be running, with the client on [http://localhost:3000](http://localhost:3000) and the server on [http://localhost:3004](http://localhost:3004).

## Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run server`  | Start backend server with `nodemon`        |
| `npm run client`  | Start frontend in development mode         |
| `npm run dev`     | Concurrently run both frontend and backend |
| `npm run build`   | Build the frontend for production          |
| `npm run preview` | Preview the built frontend                 |

## API Endpoints

### Authentication
- **POST** `/api/v1/auth/register`: Register a new user
- **POST** `/api/v1/auth/login`: Login an existing user

### User
- **POST** `/api/v1/user/getUser`: Fetch user information (Protected Route)

## Redux Slices

- **alertSlice**: Manages loading state and shows loading spinner.
- **authSlice**: Manages user authentication and stores user data.

## Components

- **Header**: Reusable header for Login and Register pages.
- **InputForm**: Custom input component for easy form field setup.
- **Spinner**: Loading indicator component.
- **PrivateRoute**: Higher-order component to protect routes for authenticated users.

## Project Structure Highlights

- **PrivateRoute Component**: Ensures only authenticated users can access certain pages, redirecting unauthenticated users to login.
- **Redux State Management**: Utilizes Redux slices for global state management of alerts and authentication.
- **Toast Notifications**: Provides feedback on user actions for a better experience.


---

## Contributions

Contributions are welcome! Please fork this repository and create a new branch with your feature. Submit a pull request, and it will be reviewed as soon as possible.

## Contact

Feel free to reach out via GitHub issues if you have any questions or suggestions.

