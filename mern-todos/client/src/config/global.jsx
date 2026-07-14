import { message } from "antd"

window.appName = import.meta.env.VITE_APP_NAME
window.apiURL = import.meta.env.VITE_API_URL

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
window.isValidEmail = email => emailRegex.test(email)

window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

window.toastify = (msg, type = "info") => message[type](msg)