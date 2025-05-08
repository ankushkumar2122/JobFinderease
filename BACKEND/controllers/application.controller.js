const Application = require("../models/Application.model");
const Job = require("../models/job.model");

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const JobId = req.params.id;
    if (!JobId) {
      return res
        .status(400)
        .json({ message: "job Id required", success: false });
    }
    //check if the user has already applied for job
    const existingApplication = await Application.findOne({
      job: JobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "you have already apply for jobs", success: false });
    }
    //chek  if the job exist
    const job = await Job.findById(JobId);
    if (!job) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    //create a new application
    const newapplication = await Application.create({
      job: JobId,
      applicant: userId,
    });
    job.applications.push(newapplication._id);
    await job.save();
    return res
      .status(201)
      .json({ message: "job applied succesfully", success: true });
  } catch (error) {
    console.log(error);
  }
};


const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      }); //sort application in ascending odr
    if (!application) {
      return res
        .status(404)
        .json({ message: "No application", success: false });
    }
    return res.status(200).json({ application, success: true });
  } catch (error) {
    console.log(error);
  }
};
//admin dekhega ga ki kitana applicant hai
const getApplicant = async (req, res) => {
  try {
    const jobid = req.params.id;
    const job = await Job.findById(jobid).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });
    if (!job) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

const updatestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(404)
        .json({ message: "status is required", success: false });
    }
    const application = await Application.findById(applicationId);

    if (!application) {
      return res
        .status(404)
        .json({ message: "application not found", success: false });
    }
    //updated status
    application.status = status.toLowerCase();
    await application.save();
    return res
      .status(200)
      .json({ message: "status updated successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { applyJob, getAppliedJob, getApplicant, updatestatus };
