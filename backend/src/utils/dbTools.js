const createDoc = model => async (req, res) => {
  const submittedBy = req.user._id;
  console.log(submittedBy);
  try {
    const doc = await model.create({ ...req.body, submittedBy });
    console.log(doc);
    console.log(req.body);
    res.status(201).json({ data: doc });
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

const getAllSurveys = model => async (req, res) => {
  try {

    const genderCount = await model.aggregate([
      {
        $group: { _id: "$gender", total: { $sum: 1 } }
      }
    ]);
    
    //took 5.25ms to return my results using aggregate
    const educationCount = await model.aggregate([
      {
        $group: { _id: "$education", total: { $sum: 1 } }
      }
    ])
   
    const employmentCount = await model.aggregate([
      {
        $group: { _id: "$employmentStatus", total: { $sum: 1 } }
      }
    ]);

   return res.status(200).json({ educationCount, genderCount, employmentCount });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

const getAllDocs = model => async (req, res) => {
  try {
    const docs = await model.find({});

    console.log(docs);
    res.status(200).json({ data: docs });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
// need one for updating profile || survey data
// create controller file IAW someController.js 
// import Schema you would like to pass through as a model
//
// pass in as the model through your controller
//
export const mongoTools = model => ({
  createDoc: createDoc(model),
  getAllDocs: getAllDocs(model),
  getAllSurveys: getAllSurveys(model)
});
