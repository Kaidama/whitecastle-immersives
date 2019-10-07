import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import { showMeYourPooh, signup, signin } from "../src/utils/auth";
import userRouter from "../src/routes/users";
import surveyRouter from "../src/routes/survey";

import "dotenv/config";

const app = express();

// DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MONGODB ATLAS"))
  .catch(error => console.log(`error: `, error));

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/signup", signup); // @desc handles signup with creating a user / bcrypt / assigns JWT
app.post("/signin", signin); // @desc handles sign in with verifying existing user / bcrypt / assigns JWT for protected /api routes

app.use("/api", showMeYourPooh); // @desc protected by jwt, this is where we check for POOH. 
/** NOTE: To test this in postman do not forget to grab the token from the header and plug it in AUTH and select type: Bearer Token or inherit from parent works too **/

app.use("/api/survey", surveyRouter); // @desc handles submitting surveys and populating survey DB collection
/**************************
 * NOTE: I created a ton of fake data for us to populate under 1 user for the time being just to have some numbers to show for our chart 
 *************************/
app.use("/api/user", userRouter); // @desc shows you who is the currently logged in

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
