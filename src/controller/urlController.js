const shortid = require('shortid')
const validUrl = require('valid-url')
const urlModel = require('../model/urlModel')


// 1. API ========================================== CREATE URL ===========================================================================

const createShortenUrl = async function (req, res) {
    try {
        let data = req.body
        let { longUrl } = data


        const baseUrl = "http://localhost:3000"


        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Please enter request data to be created" })
        }

        if (!longUrl) {
            return res.status(400).send({ status: false, msg: "Please enter longUrl" })
        }

        if (!validUrl.isUri(longUrl)) {
            return res.status(400).send({ status: false, msg: "Please enter valid longUrl" })
        }

        let urlCode = shortid.generate().toLowerCase()
        let shortUrl = baseUrl + '/' + urlCode


        let longVaildurl = (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/).test(longUrl.trim())
        if (!longVaildurl) {
            return res.status(400).send({ status: false, message: "Please enter vaild longUrl" })
        }


        let url1 = await urlModel.findOne({ longUrl: longUrl }).select({ urlCode: 1, shortUrl: 1, _id: 0 })
        if (url1) {
            return res.status(409).send({ status: false, message: "This url is already shorten", message: url1 })
        }

        let saveData = { longUrl, shortUrl, urlCode }

        let urlCreated = await urlModel.create(saveData)
        res.status(201).send({ status: true, message: "Success", data: saveData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

// 2. API ========================================== GET URL ===========================================================================


const getUrl = async function (req, res) {
    try {
        const urlCode = req.params;

        const findUrlCode = await urlModel.findOne(urlCode)
        if (!findUrlCode) return res.status(404).send({ status: false, message: "This shortUrl and urlCode is Not found" })


        return res.status(302).redirect(findUrlCode.longUrl)

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};


module.exports = { createShortenUrl, getUrl }

