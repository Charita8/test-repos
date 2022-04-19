/********** CORE MODULES **********/
const path = require("path");

/********** NPM MODULES ***********/

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000
/************* CUSTOM MODULES  *************/

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

/**************** INITIAL SETUP ***********************/

const app = express();

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/*****************SESSION SETUP *************/

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  collectionName: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

/************* Flash Setup ***********/
app.use(flash());


/**** CORES Settings ****/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});




/************* Static files ***********/

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));

/********** SETTING UP ROUTES *************/

app.use(feedRoutes);
app.use(authRoutes);

/************* Error Handling ************/

app.use((error, req, res, next) => {
  console.log(error);
  res.render("500");
});

/************* 404 Not Found  */

app.use("*", (req, res, next) => {
  res.render("page404");
});

/******** SERVER SETUP **********/

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB server");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
