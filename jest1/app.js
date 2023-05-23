const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
// Setup body parser
app.use(express.json());

// Set cookie parser
app.use(cookieParser());

app.use(fileUpload());

// Importing all routes
const { authRoute } = require('./routes/auth')
const { jobRoute } = require('./routes/jobs')

app.use("/api/v1", authRoute);
app.use("/api/v1", jobRoute);

// Handle unhandled routes
app.all("*", (req, res) => {
    return res.status(404).json({
        error: `Route not found`,
    });
});

module.exports = app;