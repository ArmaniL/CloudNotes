require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/notesRoute.js");
const userRoutes = require("./routes/usersRoute");
const app = express();

app.use(cors());
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 2000,
});

app.use(express.json()); // Make sure it comes back as json
app.use(morgan("common"));
app.use(helmet());
app.use(userRoutes);
app.use(noteRoutes);
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});


fileServer = express();
fileServer.use(morgan("common"))
fileServer.use(express.static("./frontend/my-app/build"));
fileServer.listen(3000,()=>{
  console.log("Website is being hosted on port 300")
})