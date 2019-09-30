import mongoose from "mongoose";
import moment from "moment";
import bcrypt from "bcryptjs";
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

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});
//add a instance method constructed from Models in 'this' Schema. DO NOT USE ES6 ARROW FUNCTIONS


export const User = mongoose.model("user", userSchema);
