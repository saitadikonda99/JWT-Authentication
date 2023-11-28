

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
require('dotenv').config()
const PORT = process.env.PORT || 3001


// import routes here from routes
const Login = require('./routes/loginRoute')
const Refresh = require('./routes/refreshRoute')
const Profile = require('./routes/ProfileRoute')
const Logout = require('./routes/logoutRoute')

// db file 
const pool = require('./config/db')

// cookie 
app.use(cookieParser());

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', Login)
app.use('/', Refresh)
app.use('/', Profile)
app.use('/logout', Logout)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})







