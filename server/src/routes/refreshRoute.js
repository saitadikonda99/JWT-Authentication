const express = require('express')
const router = express.Router()

const { handlerefreshToken } = require('../controller/refreshController')

router.get('/refresh', handlerefreshToken );

module.exports = router;

