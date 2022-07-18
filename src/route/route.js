const express = require('express')
const router = express.Router()












//================= BAD URL VALIDATION ============================================
router.all("*" , (req,res)=>{
    res.status(404).send({ msg:"NOT FOUND THIS URL"})
})

module.exports=router