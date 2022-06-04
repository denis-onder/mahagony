# Mahogany

> A simple user management application written using React, Node.js, Express, TypeScript, Vite and MongoDB.

## Base URLs
  * Client: `http://localhost:3000`
  * Server: `http://localhost:9000`

## Installation & Configuration
  1. Run `npm install` in both the `/server` and `/client` directories to install all of the necessary dependencies.
  2. Duplicate the `.env.example` file in both the `/server` and `/client` directories.
  3. In `/server/.env`, set the `MONGO_DB_URI` variable to your MongoDB connection URI.
  4. In `/client/.env`, set the `REACT_APP_BACKEND_URL` variable to the base URL of your back-end.

## Starting The Application
  1. Boot up the back-end by running `npm run dev` in the `/server` directory.
  2. Boot up the front-end by running `npm run dev` in the `/client` directory.

## Links
  * [Postman Workspace](https://app.getpostman.com/join-team?invite_code=cf4119ffe86d03e5204a93f366b1bfbc&target_code=6102eda28e4202480bebb34b27ed30db)
  * Live Application [TBD]

## Implemented Since Submission
1. Implemented the `/assign/:id` page, to segregate modifying permissions to another page.
2. Implemented paging for the `GET /users` endpoint.
3. Added missing `Status` field in the Edit Employee modal.