// import { SurveyData } from '../models/SurveyData'
import { Router } from "express";
import controllers from "../controllers/surveyController";

const router = Router();

router
  .route("/")
  .post(controllers.createDoc)
  .get(controllers.getAllSurveys); // this is where we get all the surveys. pass this route to handler after submitting the survey

export default router;
