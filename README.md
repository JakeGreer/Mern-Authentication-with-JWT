# mern-auth

Minimal full-stack MERN app with authentication using passport and JWTs.

This project uses the following technologies:

- [React](https://reactjs.org) and [React Router](https://reacttraining.com/react-router/) for frontend
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MongoDB](https://www.mongodb.com/) for the database
- [Redux](https://redux.js.org/basics/usagewithreact) for state management between React components

## Configuration
Make sure to add a `keys.js` file within the `config` folder. This must include your own `MONGOURI` from your [mLab](http://mlab.com) database in `config/keys.js` .

```javascript
module.exports = {
    mongoURI: "YOUR_MONGO_URI_HERE",
    secretOrKey: "your secret key",
    PORT: 3001,
    NODE_ENV: 'development',
    DEBUG: true,
    MAX_CONTENT_LENGTH_ACCEPTED: 9999,
};
```

If you are hosting the database locally on your machine make sure you have mongodb installed and have `mongod` running in the background. Your `MONGOURI` will look like `mongodb://localhost/your-db-name`

## Quick Start

```javascript
// Install dependencies for server & client
npm install && npm run client-install

// Run client & server with concurrently
npm start

// Server runs on http://localhost:5000 and client on http://localhost:3000
```

For deploying to Heroku, please refer to [this](https://www.youtube.com/watch?v=71wSzpLyW9k) helpful video by TraversyMedia.
