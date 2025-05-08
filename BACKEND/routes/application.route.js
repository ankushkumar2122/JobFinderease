const express = require("express");
const router = express.Router();
const {
  applyJob,
  getAppliedJob,
  getApplicant,
  updatestatus,
} = require("../controllers/application.controller");
const { IsAuthenticated } = require("../Middleware/isAuthenticated");

router.get("/apply/:id", IsAuthenticated, applyJob);
router.get("/get", IsAuthenticated, getAppliedJob);
router.get("/:id/applicants", IsAuthenticated, getApplicant);
router.post("/status/:id/update", IsAuthenticated, updatestatus);
module.exports = router;