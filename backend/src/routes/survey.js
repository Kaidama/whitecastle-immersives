// import { SurveyData } from '../models/SurveyData'
import { Router } from "express";
import controllers from "../controllers/surveyController";

const router = Router();

router
  .route("/")
  .post(controllers.createDoc)
  .get(controllers.getAllDocs); // this is where we get all the docs. pass this route to handler after submitting the survey

export default router;
