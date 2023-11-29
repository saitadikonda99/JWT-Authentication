const express = require('express')
const router = express.Router()

const { handleLogout } = require('../controller/logoutController')

router.get('/', handleLogout);


module.exports = router;

