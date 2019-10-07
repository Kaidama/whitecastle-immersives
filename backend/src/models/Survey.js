import mongoose from 'mongoose'
import moment from 'moment'
const now = moment()


const SurveySchema = new mongoose.Schema({
  createdBy: { 
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'user',
    required: true
  },
  gender: { type: String, default: "" },
  education: { type: String, default: "" },
  employmentStatus: { type: String, default: "" },
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, kk:mm:ss")
  }
});

export const Survey = mongoose.model("survey", SurveySchema);
