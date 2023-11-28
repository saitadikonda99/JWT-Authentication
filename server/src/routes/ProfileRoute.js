

const express = require('express')
const router = express.Router()

// import the verifyJWT 
const verifyJWT = require('../middleware/verifyJWT') 


router.get('/profile', verifyJWT, (req, res) => {
    const data = {name:"Tadikonda Sai Manikanta", age:20}
    res.send(data)
})

module.exports = router


