const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);  

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});