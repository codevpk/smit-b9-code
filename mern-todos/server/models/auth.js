const mongoose = require("mongoose")
const { Schema } = mongoose;

const scehma = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    status: { type: String, default: "active" },
    role: { type: String, default: "student" },
    photo: {
        url: { type: String, default: "" },
        publicId: { type: String, default: "" }
    },
}, { timestamps: true });

const users = mongoose.model('users', scehma);
module.exports = users