const express = require("express")
const { getRandomId } = require("../utils/global")
const Todos = require("../models/todos")

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        const { title = "", location = "", description = "", dueDate = "" } = req.body

        if (!title || !location || !description || !dueDate) {
            return res.status(400).json({ message: "All fields are required", isError: true })
        }

        const todoData = { title, location, description, dueDate }
        todoData.id = getRandomId()

        const todo = new Todos(todoData)
        await todo.save()

        return res.status(201).json({ message: "A new todo has been successfully created", todo })

    } catch (error) {
        console.error("error", error)
        res.status(500).json({ message: "Todo not created. Internal Server Error.", error, isError: true })
    }
})

router.get("/all", async (req, res) => {
    try {

        // const uid = "456789"

        const todos = await Todos.find({})

        return res.status(200).json({ message: "Todos fetched successfully", todos })

    } catch (error) {
        console.error("error", error)
        res.status(500).json({ message: "Todos not fetched. Internal Server Error.", error, isError: true })
    }
})

router.get("/single", async (req, res) => {
    try {

        const { id } = req.query

        console.log('id', id)

        const todo = await Todos.find({ id })

        return res.status(200).json({ message: "Todo fetched successfully", todo })

    } catch (error) {
        console.error("error", error)
        res.status(500).json({ message: "Todo not fetched. Internal Server Error.", error, isError: true })
    }
})

router.patch("/update", async (req, res) => {
    try {

        const { id } = req.query

        const { title = "", location = "", description = "", dueDate = "" } = req.body

        if (!title || !location || !description || !dueDate) {
            return res.status(400).json({ message: "All fields are required", isError: true })
        }

        const todoUpdatedData = { title, location, description, dueDate }
        todoUpdatedData.id = getRandomId()

        const todo = await Todos.findOneAndUpdate({ id }, todoUpdatedData, { new: true })

        return res.status(201).json({ message: "A todo has been successfully updated", todo })

    } catch (error) {
        console.error("error", error)
        res.status(500).json({ message: "Todo not updated. Internal Server Error.", error, isError: true })
    }
})

router.delete("/single", async (req, res) => {
    try {

        const { id } = req.query

        console.log('id', id)

        const todo = await Todos.findOneAndDelete({ id })

        return res.status(200).json({ message: "Todo deleted successfully", todo })

    } catch (error) {
        console.error("error", error)
        res.status(500).json({ message: "Todo not deleted. Internal Server Error.", error, isError: true })
    }
})

module.exports = router