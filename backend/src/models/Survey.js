import mongoose from "mongoose";
import moment from "moment";
const now = moment();

const SurveySchema = new mongoose.Schema({
  submittedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  gender: { type: String },
  education: { type: String },
  employmentStatus: { type: String },
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, kk:mm:ss")
  }
});



SurveySchema.index(
  { user: 1, gender: 1}
);
export const Survey = mongoose.model("survey", SurveySchema);
