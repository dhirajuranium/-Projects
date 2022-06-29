const internModel = require('../models/internModel')



const createIntern = async function (req, res) {
    try {
        let { name, email, mobile, collegeName } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter a data in request body" })
        }
        if (!name) {
            return res.status(400).send({ status: false, msg: "name is missing" })
        }
        if (!email) {
            return res.status(400).send({ status: false, msg: "email is missing" })
        }
        if (!mobile) {
            return res.status(400).send({ status: false, msg: "please enter mobile" })

        } if (!collegeName) {
            return res.status(400).send({ status: false, msg: "please enter collegeName" })
        }

            let saveData = await collegeModel.create(req.body)
            return res.status(201).send({ status: true, data: saveData, msg: "College is created Successfully" })
        }catch (err) {
            return res.status(500).send({ status: false, msg: err.message })
        }
    }