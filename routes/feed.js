const express = require("express");
const multer = require("multer");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/isAuth");
const isAuthAPI = require("../middleware/isAuthAPI");
const loginStatus = require("../middleware/loginStatus");
const newQuestionValidator = require("../middleware/validators/newQuestion");
const getHomePageValidator = require("../middleware/validators/getHome");
const getQuestionsValidator = require("../middleware/validators/getQuestions");
const editQuestionValidator = require('../middleware/validators/editquestion');
const { storage } = require("../middleware/multerConfig");
const upload = multer({storage});
const editProfileValidator = require('../middleware/validators/editprofile');

const router = express.Router();

router.get("/", loginStatus, feedController.getLandingPage);

router.get("/about", loginStatus, feedController.getAboutPage);

// router.post("/forgetPassword", loginStatus, feedController.getForgetPassword);

router.get("/home", isAuth, getHomePageValidator, feedController.getHomePage);

router.get("/myaccount", isAuth, feedController.getProfile);

router.post(
  "/profileDp",
  isAuth,
  upload.single("profilePic"),
  feedController.postProfileDp
);

router.get("/questionPage", isAuth, feedController.getQuestion);

router.get("/userActivity", isAuth, feedController.getActivity);

router.get("/PublicProfile", isAuth, feedController.getPublicProfile);

router.get("/Editprofile", isAuth, feedController.getEditProfile);

router.post("/editprofile", isAuth, editProfileValidator, feedController.postEditProfile);

router.post('/editquestion', isAuth, editQuestionValidator, feedController.postEditQuestion);

router.get(
  "/questions",
  loginStatus,
  getQuestionsValidator,
  feedController.getQuestions
);

//router.get("/questions/details", feedController.getQuestion);

router.get("/follow", isAuthAPI, feedController.follow);
router.get("/unfollow", isAuthAPI, feedController.unfollow);

router.post(
  "/askquestion",
  isAuth,
  newQuestionValidator,
  feedController.postAskQuestion
);

router.post("/newanswer", isAuth, feedController.postNewAnswer);

router.get("/mynetwork", isAuthAPI,feedController.getMyNetwork);

module.exports = router;
