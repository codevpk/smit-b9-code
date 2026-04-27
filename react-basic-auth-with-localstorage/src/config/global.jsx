import { message } from "antd"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
window.isValidEmail = email => emailRegex.test(email)

window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

window.toastify = (msg, type = "info") => message[type](msg)