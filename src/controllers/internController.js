const internModel = require('../models/internModel')
const collegeModel = require('../models/collageModel')
const validator = require('validator')



const createIntern = async function (req, res) {
    try {
        let { name, email, mobile, collegeName } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter a data in request body" })
        }
        if (!name) {
            return res.status(400).send({ status: false, msg: "name is missing" })
        }
        if (typeof req.body.name !== "string") return res.status(400).send({ status: false, msg: " Please enter  name as a String" });

        let validname = /^\w[a-zA-Z.\s]*$/;
        if (!validname.test(req.body.name)) return res.status(400).send({ status: false, msg: "The  name may contain only letters" });

        if (!email) {
            return res.status(400).send({ status: false, msg: "email is missing" })
        }
        if (typeof req.body.email !== "string") return res.status(400).send({ status: false, msg: " Please enter  email as a String" });


        if (!validator.isEmail(email)) return res.status(400).send({ status: false, msg: "Entered email is invalid" });
        let uniqueEmail = await internModel.findOne({ email: email })
        if (uniqueEmail) {
            return res.status(400).send({ status: false, msg: "This email already exists" })
        }

        if (!mobile) {
            return res.status(400).send({ status: false, msg: "please enter mobile" })
        }
        let uniqueMobailNumber = await internModel.findOne({ mobile: mobile })
        if (uniqueMobailNumber) {
            return res.status(400).send({ status: false, msg: "This mobile already exists" })
        }
        let validMobailNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (!validMobailNumber.test(req.body.mobile)) return res.status(400).send({ status: false, msg: " please enter valid Mobail Number" });



        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "please enter collegeName" })
        }
        let validCollegeName = /^\w[a-zA-Z.\s]*$/;
        if (!validCollegeName.test(req.body.collegeName)) return res.status(400).send({ status: false, msg: "The  collegeName may contain only letters" });

        if (typeof req.body.collegeName !== "string") return res.status(400).send({ status: false, msg: " Please enter  collegeName as a String" });


        const getCollegeId = await collegeModel.findOne({ name: collegeName });
        if (!getCollegeId) {
            return res.status(404).send({ status: false, message: "College not registered" });
        }
        const getId = getCollegeId._id;

        req.body.collegeId = getId;



        let saveData = await internModel.create(req.body)
        return res.status(201).send({ status: true, data: saveData, msg: "Intern is created Successfully" })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports.createIntern = createIntern