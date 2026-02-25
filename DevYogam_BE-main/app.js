require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const poojaRoutes = require("./routes/poojaRoutes");
const templeRoutes = require("./routes/templeRoutes");
const chadavaRoutes = require("./routes/chadhavaRoutes");
const payRoutes = require("./routes/payRoutes");
const fileRoutes = require("./routes/fileRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// 🔥 Connect DB directly (NO async wrapper)
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS
// app.use(cors({
//   origin: [
//     "https://devyogam.com",
//     "https://www.devyogam.com"
//   ],
//   credentials: true
// }));

app.use(cors({
  origin: true,
  credentials: true
}));
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Dev Yogam API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "https://devyogam.com"
      }
    ],
  },
  apis: [
    path.join(__dirname, "./routes/*.js")
  ],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/poojas", poojaRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/chadhavas", chadavaRoutes);
app.use("/api/payment", payRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/reviews", reviewsRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;
