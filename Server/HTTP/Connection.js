const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser middleware
const session = require("express-session");
const port = 3036;
const app = express(); // Creating an instance of Express
const apiRoutes = require("./routes/api");

// Middleware to parse JSON and urlencoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes);
app.use(
  session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: 'MyKargadaOnly', // This needs to be unique per-host.
    cookie: {
      secure: false, // required for cookies to work on HTTPS
      httpOnly: false,
      sameSite: 'lax'
    }
  })
);
// Start server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
