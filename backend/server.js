import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'


const mongoose = require("mongoose")

const passport = require('passport')

require('dotenv').config()

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



app.use(passport.initialize())
require('./auth/passport')(passport)

app.use(cors())
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));


app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)
)
