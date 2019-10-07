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
    res.status(400).end();
  }
};

const getAllDocs = model => async (req, res) => {
  try {
    const docs = await model.aggregate([
      {
        $group: { _id: "$education", total: { $sum: 1 } }
        // $group : {_id : "$employmentStatus", total :{ $sum : 1}}
      }
    ]);

    console.log(docs);
    res.status(200).json({ data: docs });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
// need one for updating profile || survey data
//
export const mongoTools = model => ({
  createDoc: createDoc(model),
  getAllDocs: getAllDocs(model)
});
