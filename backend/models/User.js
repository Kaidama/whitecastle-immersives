import mongoose from 'mongoose'
import * as moment from 'moment'

const now = moment();

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, default: "" },
  password: { type: String, default: "" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, kk:mm:ss")
  }
});

export const User = mongoose.model("user", userSchema);
