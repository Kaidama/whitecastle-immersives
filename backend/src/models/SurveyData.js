import mongoose from 'mongoose'

// const mongoose = require("mongoose");
// const moment = require("moment");
// const Schema = mongoose.Schema
// const now = moment()

// const SurveySchema = new Schema({
//   user: { 
//     type: Schema.Types.ObjectId, 
//     ref: 'user'
//   },
//   gender: { type: String, default: "" },
//   education: { type: String, default: "" },
//   employmentStatus: { type: String, default: "" },
//   timestamp: {
//     type: String,
//     default: now.format("dddd, MMMM Do YYYY, kk:mm:ss")
//   }
// });
// module.exports = mongoose.model("survey", SurveySchema);




const SurveySchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'user'
  },
  gender: { type: String, default: "" },
  education: { type: String, default: "" },
  employmentStatus: { type: String, default: "" },
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, kk:mm:ss")
  }
});
module.exports = mongoose.model("survey", SurveySchema);
