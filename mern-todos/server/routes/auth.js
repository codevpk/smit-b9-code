const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const Users = require("../models/auth")
const { verifyUser } = require("../middlewares/auth")
const { getRandomId, isValidEmail } = require("../utils/global")

const router = express.Router()

const { JWT_SECRET_KEY } = process.env

router.post("/register", async (req, res) => {
    try {

        const { fullName = "", email = "", password = "" } = req.body

        if (fullName.length < 3) { return res.status(403).json({ message: "Full name isn't correct", isError: true }) }
        if (!isValidEmail(email)) { return res.status(403).json({ message: "Email address isn't valid", isError: true }) }
        if (password.length < 6) { return res.status(403).json({ message: "Password must be minimum 6 chars.", isError: true }) }

        const isUserExists = await Users.findOne({ email })
        if (isUserExists) { return res.status(403).json({ message: "User already exists", isError: true }) }

        const hashedPassword = await bcrypt.hash(password, 10)

        const uid = getRandomId()
        const userData = { uid, fullName, email, password: hashedPassword }

        const user = new Users(userData)
        await user.save()

        return res.status(201).json({ message: "A new user has been successfully registered" })

    } catch (error) {
        console.error("error", error)
        res.status(500).json({ message: "User not registered. Internal Server Error.", error, isError: true })
    }
})

router.post("/login", async (req, res) => {
    try {

        const { email = "", password = "" } = req.body

        if (!isValidEmail(email)) { return res.status(403).json({ message: "Email address isn't valid", isError: true }) }

        const user = await Users.findOne({ email })
        if (!user) { return res.status(404).json({ message: "Invalid credentials", isError: true }) }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) { return res.status(404).json({ message: "Invalid credentials", isError: true }) }

        const token = jwt.sign({ uid: user.uid }, JWT_SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).json({ message: "Login successful", token })

    } catch (error) {
        console.error("error", error)
        res.status(500).json({ message: "User not logged in. Internal Server Error.", error, isError: true })
    }
})

router.get("/user", verifyUser, async (req, res) => {
    try {

        const { uid } = req.user
        console.log('uid', uid)

        const user = await Users.findOne({ uid }).select("-password")
        if (!user) { return res.status(404).json({ message: "User not found", isError: true }) }

        return res.status(200).json({ message: "User found", user })

    } catch (error) {
        console.error("error", error)
        res.status(500).json({ message: "User not found. Internal Server Error.", error, isError: true })
    }
})


module.exports = router