// import { SurveyData } from '../models/SurveyData'
import { Router } from 'express'
import controllers from '../controllers/surveyController'
import verifyToken from '../utils/auth'


const router = Router()

router
.route('/')
.post(controllers.createDoc)



export default router