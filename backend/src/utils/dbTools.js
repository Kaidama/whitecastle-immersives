const createDoc =  model => async (req, res) => {
    const submittedBy = req.user._id  
    try{
        const doc = await model.create({ ...req.body, submittedBy })
        console.log(req.body)
        res.status(201).json({ data: doc })
    }catch (err){
        console.log(err)
        res.status(400).end()
    }
}

const getAllDocs = model => async (req, res) => {

    try{
        const docs = await model.find({})
        .populate('survey')
        .select('gender education employmentStatus -_id')
        .lean()
        .exec()
        console.log(docs)
        res.status(200).json({ data: docs })
    }catch(err){
        console.log(err)
        res.status(400).end()
    }
}


export const mongoTools = model => ({
    createDoc: createDoc(model),
    getAllDocs: getAllDocs(model)
})