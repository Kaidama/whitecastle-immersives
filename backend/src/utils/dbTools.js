const createDoc =  model => async (req, res) => {

    const createdBy = req.user._id  
    try{
        const doc = await model.create({ ...req.body, createdBy })
        res.status(201).json({ data: doc })
    }catch (e){
        console.log(e)
        res.status(400).end()
    }
}



export const mongoTools = model => ({
    createDoc: createDoc(model)
    //update
    //read - maybe use for history

})