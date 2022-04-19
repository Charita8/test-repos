const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: String,
  },
  branch: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    default: "Hello! I am new to CollegeGeeks.",
  },
  dp: {
    type: String,
    default: "/images/user.png",
  },
  // token: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Token",
  // },
  dpFilename:{
    type:String,
    default:"collegegeeks",
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  likedQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  likedAnswers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  answeredQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
