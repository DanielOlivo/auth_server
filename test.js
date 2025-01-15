// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')

// jwt.sign payload secret_code expire_time

const expireTime = Math.floor(Date.now() / 1000) + 15 * 60 // expire time in 15 minutes

const myToken = jwt.sign(
    {
        userId: 111, 
        email: 'john@gmail.com', 
        username: 'john.doe'
    }, 
    '123456', 
    {expiresIn: '30s'}
)


console.log('token', myToken)

const expireToken = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMSwiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiam9obi5kb2UiLCJpYXQiOjE3MzY3NTUyODIsImV4cCI6MTczNjc1NTMxMn0.Rtv5cQ2zsFrXLfUtPMd9oflToxcbNz0RkPD6Leq57c8"
// const expireToken = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMSwiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiam9obi5kb2UiLCJpYXQiOjE3MzY3NTUyODIsImV4cCI6MTczNjc1NTMxMn0.Rtv5cQ2zsFrXLfUtPMd9oflToxcbNz0RkPD6Leq57c8"

// jwt.verify token, secret, callback function


jwt.verify(myToken, '123456', (err, decode) => {
    if(err){
        console.log('err', err)
        return
    }
    console.log(decode)
})