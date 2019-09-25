
const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema
const now = moment()

const SurveySchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'User'},
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, kk:mm:ss")
  },
  gender: { type: String, default: "" },
  education: { type: String, default: "" },
  status: { type: String, default: "" }
});
module.exports = mongoose.model("survey", SurveySchema);
