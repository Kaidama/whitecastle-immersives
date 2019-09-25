const mongoose = require("mongoose");
const Schema = mongoose.Schema
const moment = require("moment");
const now = moment()

const UserSchema = new Schema({
  email: { type: String, lowercase: true },
  password: { type: String, default: "" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, kk:mm:ss")
  },
  data: [{ type: Schema.Types.ObjectId, ref: 'SurveyData' }]
});



module.exports = mongoose.model("user", UserSchema);
