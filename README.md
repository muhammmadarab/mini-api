# Mini Social Media - Backend

Mini Social Media is a simple social media application backend built with Node.js, Express, and MongoDB. It provides API endpoints to handle user authentication, post creation, retrieval, and interactions.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#getting-started)
- [Static File Server](#static-file-server)
- [Middleware](#middleware)
- [File Structure](#file-structure)
- [Conclusion](#conclusion)

## Prerequisites

- Node.js
- MongoDB (Make sure your MongoDB server is running)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/muhammmadarab/mini-social-media-backend.git
cd mini-social-media-backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure Environment Variables:

Create a `.env` file in the root directory and set the following environment variables:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mini
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRE_TIME=2h
REFRESH_TOKEN_EXPIRE_TIME=7d
```

Replace `your_access_token_secret` with your preferred secret for JWT token generation.

4. Create Directories for Uploaded Files and User Profile Pictures

Create two directories named `uploads` and `profiles` in the root folder to store uploaded files and user profile pictures.

5. Run the application:

```bash
npm start
```

The server will start running at `http://localhost:5000`.

## API Endpoints

- `POST /api/auth/signup`: Register a new user. Required parameters: `username`, `email`, `name` and `password`.
- `POST /api/auth/login`: Log in an existing user. Required parameters: `username` and `password`.
- `POST /api/auth/refresh-token`: Refresh the access token for a user using a valid refresh token in the request body. If the refresh token is valid, a new access token will be generated and returned in the response.
- `GET /api/post`: Get all posts (Requires authentication).
- `GET /api/post/:id`: Get a post by ID (Requires authentication).
- `POST /api/post/create`: Create a new post (Requires authentication and a media file upload). Supported media types: images and videos.
- `PUT /api/post/update/:id`: Update a post by ID (Requires authentication).
- `DELETE /api/post/delete/:id`: Delete a post by ID (Requires authentication).
- `POST /api/post/:id/like`: Like/unlike a post by ID (Requires authentication).
- `GET /api/user/:id`: Get User Details by ID (Requires Authentication)

## Static File Server

The server is also configured to serve static files for media content and user profile pictures. The following endpoints are used for static file serving:

- `/uploads`: This endpoint serves files from the "uploads" directory. It is used to serve media files.
- `/user/profile`: This endpoint serves files from the "profiles" directory. It is used to serve user profile pictures.

## Middleware

- `checkAuth`: Middleware to check the authentication token for protected routes.
- `fileUpload`: Middleware to handle file uploads using Multer.
- `uploadProfilePicture`: Middleware to handle profile picture upload during signup using Multer.

## File Structure

- `controllers`: Contains the controller functions for handling various API endpoints.
- `middlewares`: Contains custom middleware functions.
- `models`: Contains the MongoDB schema models.
- `routes`: Contains the API route definitions.
- `utils`: Contains the utility functions.
- `uploads`: Directory to store uploaded media files (images and videos).
- `profiles`: Directory to store profile pictures (images).

## Conclusion

The Mini Social Media Backend provides a scalable API for user authentication and post management. It uses Node.js, Express, and MongoDB for efficiency. The API supports registration, login, post creation, and interaction with posts. JWT ensures secure authentication, and the server serves static files for media content and user profile pictures.
