require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { connectToMongoDB } = require("./config/db")

const auth = require("./routes/auth")
const todos = require("./routes/todos")

const app = express()
app.use(express.json())
app.use(cors())

connectToMongoDB()

app.get("/", (req, res) => {
    const now = new Date()
    res.send(`Current time: ${now.toUTCString()}. SERVER is running on PORT: ${PORT}`)
})

app.use("/auth", auth)
app.use("/todos", todos)

const { PORT = 8000 } = process.env
app.listen(PORT, () => {
    console.log(`SERVER is running on PORT: ${PORT}`)
})