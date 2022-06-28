const collegeModel = require('../models/collageModel')
// const internModel = require('../models/internModel')



const createCollege = async function (req, res) {
try{
    let { name, fullName, logoLink } = req.body

    if (Object.keys(req.body).length == 0) {
          return res.status(400).send({status:false,msg:"please enter a data in request body"})
    }
    if (!name){
        return res.status(400).send({status:false,msg:"Name is missing"})
    }
    if (!fullName){
        return res.status(400).send({status:false,msg:"fullName is missing"})
    }
    if (!logoLink){
        return res.status(400).send({status:false,msg:"please enter logo link"})
    }
    let saveData=await collegeModel.create(req.body)
           return res.status(201).send({status:true,data:saveData,msg:"College is created Successfully"})
}catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}

//[name,fullname,logolink]


module.exports.createCollege=createCollege;