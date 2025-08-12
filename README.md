# Worknest

Worknest is a full-stack job hunting platform built with React (frontend) and Node.js/Express (backend). It allows students to search and apply for jobs, save jobs for later, and manage their profiles, while recruiters can manage companies and job postings and hire applicants.

## Deployed Link

Both frontend & backend are deployed on Vercel. For live project, [Click here](https://worknest-mk.vercel.app)

## Features

- **User Authentication:** Secure login/signup for students and recruiters.
- **Student Dashboard:** Browse jobs, apply, save jobs, view applied jobs, and update profile.
- **Recruiter Dashboard:** Register/manage companies, post/edit/delete jobs, view applicants.
- **Admin Routes:** Protected routes for recruiters.
- **File Uploads:** Profile photo, resume, and company logo uploads via Cloudinary.
- **Responsive UI:** Modern, mobile-friendly design using Tailwind CSS.
- **State Management:** Redux Toolkit with persistence.
- **Notifications:** Toast notifications for actions and errors.

## Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **File Uploads:** Multer, Cloudinary
- **Authentication:** JWT, Cookies
- **Other:** Shadcn UI, Sonner (toast), Framer Motion

## Folder Structure

# Project Structure

#### Frontend (`frontend/`)
- `public/` – Static assets
- `src/`
  - `components/` – React components (UI, admin, auth, shared)
  - `hooks/` – Custom React hooks for data fetching
  - `redux/` – Redux slices and store
  - `utils/` – Constants and helpers
  - `lib/` – Utility functions
- Static files: `index.html`, `package.json`, `vite.config.js`

#### Backend (`backend/`)
- `config/` – DB connection
- `controllers/` – Express controllers
- `models/` – Mongoose models
- `routes/` – Express routes
- `middlewares/` – Auth & file upload middlewares
- `utils/` – Helper utilities (Cloudinary, logging)
- Static files: `server.js`, `package.json`



## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Cloudinary account (for file uploads)

### Environment Variables

Copy `.env.sample` to `.env` in both `frontend` and `backend` folders and fill in the required values:

#### Backend `.env`

- MONGO_URI=your_mongodb_connection_string 
- SECRET_KEY=your_jwt_secret 
- CLOUD_NAME=your_cloudinary_cloud_name 
- API_KEY=your_cloudinary_api_key 
- API_SECRET=your_cloudinary_api_secret
- ALLOWED_ORIGINS=http://localhost:5173 
- PORT=3000


#### Frontend `.env`
VITE_BASE_URL=http://localhost:3000


### Installation

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```
cd frontend
npm install
```

### Running Locally

#### Backend

```
npm start
```

#### Frontend

```
npm run dev
```

> Open http://localhost:5173 in your browser.


## Deployment

- Frontend: Vercel, Netlify, or any static hosting supporting Vite.
- Backend: Vercel, Heroku, or any Node.js-compatible server.
  

## API Endpoints

See backend/routes for all REST API endpoints. Main endpoints include:

- /api/v1/user - User authentication, profile, saved jobs
- /api/v1/company - Company CRUD
- /api/v1/job - Job CRUD
- /api/v1/application - Job applications

## License
This project is licensed under the MIT License.

## Pull Request Message

PRs are welcome. When submitting a PR, please include a clear description of your changes, reference related issues if applicable, and ensure all tests pass. Use concise and informative commit messages.

## Contact

For questions or collaboration, reach out to me on [Twitter/x](https://x.com/_manishmk)

