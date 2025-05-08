
const express = require("express");
const router = express.Router();
const {
  registercompany,
  getCompany,
  getCompanyById,
  UpdateCompany,
} = require("../controllers/company.controller");
const { IsAuthenticated } = require("../Middleware/isAuthenticated");

router.post("/register", IsAuthenticated, registercompany);
router.get("/get", IsAuthenticated, getCompany);
router.get("/get/:id", IsAuthenticated, getCompanyById);
// Change POST to PUT for updating profile
router.put("/update/:id", IsAuthenticated, UpdateCompany);

module.exports = router;
