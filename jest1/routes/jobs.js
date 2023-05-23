const express = require('express')
const jobRoute = express.Router()

const { getJobs, getJob, newJob, deleteJob, updateJob } = require('../controllers/jobsController')

const { isAuthenticatedUser } = require('../middlewares/validateToken')

jobRoute.route("/jobs").get(getJobs);
jobRoute.route("/job/:id").get(getJob);

jobRoute.route("/job/new").post(isAuthenticatedUser, newJob);

jobRoute
    .route("/job/:id")
    .put(isAuthenticatedUser, updateJob)
    .delete(isAuthenticatedUser, deleteJob);

module.exports = { jobRoute };