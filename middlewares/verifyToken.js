const jwt = require('jsonwebtoken')
require('dotenv').config()

const {TOKEN_SECRET} = process.env


const verifyToken = (req, res, next) => {
    const token = req.cookies.token // 
    if(!token){
        res.status(401).json({message: 'unauthorized'})
        return
    }

    jwt.verify(token, TOKEN_SECRET, (err, decode) => {
        if(err){
            res.status(403).json({message: 'forbidden', error: err})
            return 
        }

        /** layer - check token in db */
        console.log(decode)

        /** global type of request */
        req.user = decode

        next()
    })
}

module.exports = verifyToken