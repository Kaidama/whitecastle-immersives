// import { SurveyData } from '../models/SurveyData'
import { Router } from 'express'
import controllers from '../controllers/surveyController'


const router = Router()

router
.route('/')
.post(controllers.createDoc)



export default router