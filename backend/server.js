const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow Thunder Client, Postman, server-to-server requests,
      // localhost, and the deployed frontend.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(cors());
app.use(express.json());

 connectDB();

app.get("/", (req, res) => {
  res.send("CodeFix AI Backend Running");
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeFix AI API is running",
  });
});



app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/debug", require("./routes/debugRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});