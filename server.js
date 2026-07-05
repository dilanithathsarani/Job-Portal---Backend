const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const MAX_DB_CONNECT_ATTEMPTS = 5;
let dbConnectAttempts = 0;

const connectWithRetry = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    startServer();
  } catch (err) {
    dbConnectAttempts += 1;
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
    if (err && (err.code === 'ENOTFOUND' || err.name === 'MongoNetworkError')) {
      console.error(
        'DNS lookup failed for MongoDB. If you are using MongoDB Atlas (mongodb+srv), ensure your network/DNS can resolve SRV records, or try using a standard connection string or a local MongoDB instance (mongodb://localhost:27017).'
      );
    }

    if (dbConnectAttempts >= MAX_DB_CONNECT_ATTEMPTS) {
      console.error(`Failed to connect to MongoDB after ${dbConnectAttempts} attempts. Exiting.`);
      process.exit(1);
    }

    const retryDelayMs = Math.min(20000, 2000 * dbConnectAttempts);
    console.log(`Retrying MongoDB connection in ${retryDelayMs / 1000}s... (${dbConnectAttempts}/${MAX_DB_CONNECT_ATTEMPTS})`);
    setTimeout(connectWithRetry, retryDelayMs);
  }
};

connectWithRetry();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const companyRoutes = require("./routes/companyRoutes");
app.use("/api/company", companyRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/application", applicationRoutes);

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

const recruiterRoutes = require("./routes/recruiterRoutes");
app.use("/api/recruiter", recruiterRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

