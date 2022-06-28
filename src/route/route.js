const express = require("express");
const router = express.Router();

const collegeController = require("../controllers/collageController");
const internController = require("../controllers/internController.js");
   


router.post('/functionup/colleges',collegeController.createCollege)


module.exports = router;
