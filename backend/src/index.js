import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
// import passport from 'passport'
// const mongoose = require("mongoose")
// const passport = require('passport')

import 'dotenv/config'

const app = express();

app.disable('x-powered-by')
// DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MONGODB ATLAS"))
  .catch(error => console.log(`error: `, error));


// might not need passport
// app.use(passport.initialize())
// require('./auth/passport')(passport)

app.use(cors())
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));


// app.use("/", require("./routes/index"));
// app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)
)
