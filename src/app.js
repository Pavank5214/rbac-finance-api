const express = require("express");
const app = express();
app.use(express.json());


const authRoutes = require("./routes/auth.routes");
const recordRoutes = require("./routes/record.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

app.use("/auth",authRoutes);
app.use("/records",recordRoutes);
app.use("/dashboard",dashboardRoutes)

module.exports = app;