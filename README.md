# TikTok Clone MERN Stack

This project is a simplified TikTok‑like application built with the **MERN** stack (MongoDB, Express.js, React.js, and Node.js). It demonstrates how to build a full‑stack web application that allows users to upload short videos, view them in a feed, and like them.

## Features

- **Upload videos:** Users can upload video files with a title and optional description. Uploaded files are stored on the server in the `server/uploads` directory.
- **Video feed:** The front‑end displays a list of all uploaded videos with basic playback controls. New videos appear at the top of the feed.
- **Like videos:** Each video can be liked, increasing its like counter on both the client and server.

## Project structure

```
tiktok‑clone/
├── client/   # React front‑end
├── server/   # Node/Express back‑end
├── .gitignore
└── README.md
```

## Prerequisites

To run this project you need:

- **Node.js** (v14 or later) and **npm** installed.
- **MongoDB** running locally or accessible through a connection URI.

## Installation

1. Clone or download this repository.
2. Open a terminal in the `server` directory and install dependencies:

   ```bash
   cd server
   npm install
   ```

3. Open another terminal in the `client` directory and install dependencies:

   ```bash
   cd client
   npm install
   ```

## Configuration

The back‑end attempts to connect to a MongoDB database at `mongodb://localhost:27017/tiktok_clone` by default. You can override this by setting environment variables. Create a `.env` file in the `server` directory to specify a different URI or port:

```
# Example server/.env
MONGO_URI=mongodb://localhost:27017/tiktok_clone
PORT=5000
```

If you change the back‑end port from its default (5000), update the API URLs used in the front‑end (`client/src/App.js`) accordingly.

## Running the application

### Back‑end

From the `server` directory run:

```bash
npm start
```

This command starts the Express server. By default it listens on port `5000` and serves API routes under `/api/videos`. It also exposes static video files from the `server/uploads` directory at `/uploads`.

### Front‑end

From the `client` directory run:

```bash
npm start
```

The React development server will launch (default port `3000`). Open [http://localhost:3000](http://localhost:3000) in your browser to view the app. The front‑end expects the back‑end API to be running locally on port `5000`.

## How it works

The back‑end uses Express.js and Mongoose to define a `Video` model and provide RESTful routes for listing, uploading and liking videos. Uploaded files are stored on disk using the `multer` middleware.

The front‑end uses React to render a list of videos, provide a form for uploading new videos, and allow users to like videos. It communicates with the back‑end using Axios.

## License

This project is provided for educational purposes without any warranty or guarantee. Feel free to modify or extend it for your own learning.
