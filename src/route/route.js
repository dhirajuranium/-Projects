const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')


//=================  URL API'S ============================================

router.post('/url/shorten', urlController.createShortenUrl)

router.get('/:urlCode', urlController.getUrl)


//================= BAD URL VALIDATION ============================================
router.all("*", (req, res) => {
    res.status(404).send({ msg: "NOT FOUND THIS URL" })
})

module.exports = router