const express = require("express");
const router = express.Router();
const {
  postJob,
  getAllJob,
  getJobId,
  getAdminJobs,
} = require("../controllers/job.controller");
const { IsAuthenticated } = require("../Middleware/isAuthenticated");

router.post("/post", IsAuthenticated, postJob);
router.get("/get", IsAuthenticated, getAllJob);
router.get("/getadminjobs", IsAuthenticated, getJobId);
// Change POST to PUT for updating profile
router.get("/get/:id", IsAuthenticated, getAdminJobs);

module.exports = router;
