const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const UserRouter = require("./routes/user.route");
const companyRouter = require("./routes/company.route");
const jobRouter = require("./routes/job.route");
const applicationRouter = require("./routes/application.route");
dotenv.config({});
const { connectDb } = require("./utils/db");

//middilware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsoption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsoption));

app.use("/api/v1/user", UserRouter);
("http://localhost:8000/api/v1/user/register");
("http://localhost:8000/api/v1/user/login");
("http://localhost:8000/api/v1/user/profile/update");
("http://localhost:8000/api/v1/user/logout");

app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
// app.get("/home", (req, res) => {
//   return res
//     .status(200)
//     .json({ message: "I am coming from backend", success: true });
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDb();
  console.log(`server is running at port no ${PORT} `);
});
