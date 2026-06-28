const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const connectWithRetry = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
    if (err && (err.code === 'ENOTFOUND' || err.name === 'MongoNetworkError')) {
      console.error(
        'DNS lookup failed for MongoDB. If you are using MongoDB Atlas (mongodb+srv), ensure your network/DNS can resolve SRV records, or try using a standard connection string or a local MongoDB instance (mongodb://localhost:27017).'
      );
    }
    // Exit with non-zero so a process manager (or the developer) notices the failure.
    process.exit(1);
  }
};

connectWithRetry();

const app = express();
const PORT = 5000;

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

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
