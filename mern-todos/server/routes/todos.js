const express = require("express")
const router = express.Router()

const todos = []

router.post("/create", (req, res) => {
    try {

        const { title = "", location = "" } = req.body

        const todo = { title, location }

        todos.push(todo)

        console.log("Todo created")

        res.status(201).json({ message: "A new todo has been successfully created", todo, isError: false })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Something went wrong. Internal server error", error, isError: true })
    }
})

router.get("/all", (req, res) => {
    try {

        console.log("Todos fetched")

        res.status(200).json({ message: "Todos fetched successfully", todos, isError: false })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Something went wrong. Internal server error", error, isError: true })
    }
})

module.exports = router