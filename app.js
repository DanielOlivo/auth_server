const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const path = require('path')

const {db} = require('./config/db')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}))

app.use('/api/user', userRouter)

app.use(express.static(path.join(__dirname, './client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

const PORT = 5000

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
})

// async function testConnection() {
//     try {
//         const response = await db.raw('select version()')
//         console.log(response.rows)
//     }
//     catch(err){
//         console.error(err)
//     }
// }
// testConnection()