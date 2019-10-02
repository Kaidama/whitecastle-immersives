// var express = require('express');
// var router = express.Router();
import {Router } from 'express'
const router = Router()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('looks like you are unprotected')
})

export default router