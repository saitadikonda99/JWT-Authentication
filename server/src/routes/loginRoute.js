const express = require('express')
const router = express.Router()

// import the authController from controller/authController
const { handleLogin } = require('../controller/authController')

router.post('/login', (req, res) => {
    handleLogin(req,res)
})

module.exports = router



