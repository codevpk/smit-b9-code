const express = require("express")
const app = express()

const todos = require("./routes/todos")

app.use(express.json())

app.get("/healthcheck", (req, res) => {
    const now = new Date()
    res.send(`Date: ${now.toUTCString()}, Server is running on PORT: ${PORT}`)
})

app.use("/todos", todos)

const PORT = 8000
app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT: ${PORT}`)
})