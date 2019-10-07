import mongoose from "mongoose";
import moment from "moment";
const now = moment();

// The submittedBy is just so that we can track the user's data. 
// If the user decides to change their previously submbitted data we know where to look.
// they can now that we know who created that particular survey in our "survey" collection.
// Later we will add {unique: true} so the users cant post more than one time

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

// SurveySchema.index({ user: 1, gender: 1 }); // need more time to figure this out
export const Survey = mongoose.model("survey", SurveySchema);
