const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const UserRouter = require("./routes/user.route");
const companyRouter = require("./routes/company.route");
const jobRouter = require("./routes/job.route");
const applicationRouter = require("./routes/application.route");
const { connectDb } = require("./utils/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Optional: Health check route
// app.get("/home", (req, res) => {
//   return res.status(200).json({ message: "I am coming from backend", success: true });
// });

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDb(); // Connect to MongoDB
  console.log(`Server is running at port ${PORT}`);
});
