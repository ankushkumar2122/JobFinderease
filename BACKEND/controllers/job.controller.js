// job.controller.js
const Job = require("../models/job.model");
const Company = require("../models/company.model");

// student
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      exprience,
      positon,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !exprience ||
      !positon ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(exprience),
      position: Number(positon),
      company: companyId,
      created_by: userId,
    });

    return res
      .status(201)
      .json({ message: "New job created successfully", job, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// student
const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// student
const getJobId = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// admin
const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { postJob, getAllJob, getJobId, getAdminJobs };
