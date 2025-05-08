const Company = require("../models/company.model");

const registercompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "company name required", success: false });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "you can'nt register same company", success: false });
    }
    let newCompany = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res
      .status(201)
      .json({ message: "company register successfully", newCompany,success: true });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "company not found", success: false });
    }
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log(error);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ company, success: true });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
  }
};



const UpdateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    // cloudinary logic can be added here if you want to handle logo uploads

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error in UpdateCompany:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



module.exports = {
  registercompany,
  getCompany,
  getCompanyById,
  UpdateCompany,
};
