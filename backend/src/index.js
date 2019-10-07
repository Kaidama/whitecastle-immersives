import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'

//the middleware used to get to poo
import { showMeYourPooh, signup, signin } from '../src/utils/auth'
import indexRouter from '../src/routes/index'
import userRouter from '../src/routes/users'
import surveyRouter from '../src/routes/survey'

// import passport from 'passport'
// const mongoose = require("mongoose")
// const passport = require('passport')

import 'dotenv/config'

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


// might not need passport
// app.use(passport.initialize())
// require('./auth/passport')(passport)

app.use(cors())
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));


app.post('/signup', signup)
app.post('/signin', signin)


// give all the users poo before attempting signing 

app.use('/api', showMeYourPooh)// protected by jwt
app.use('/api/survey', surveyRouter)
app.use('/api/user', userRouter)

//need a route for posting survey data
//need a route for getting results 
//need a route for 


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)
)
