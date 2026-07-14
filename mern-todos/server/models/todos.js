const mongoose = require("mongoose")
const { Schema } = mongoose;

const scehma = new Schema({
    id: { type: String, required: true, unique: true },
    uid: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    status: { type: String, default: "incompleted" },
    visibility: { type: String, default: "private" },
    dueDate: { type: String, required: true },
    image: {
        url: { type: String, default: "" },
        publicId: { type: String, default: "" }
    },
}, { timestamps: true });

const todos = mongoose.model('todos', scehma);
module.exports = todos