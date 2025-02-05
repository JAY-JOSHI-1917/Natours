import express from "express"
import { login, register } from "../controllers/authControllers.js"
const router = express.Router()
//Auth Registration
router.post('/register', register)
//Auth Login
router.post('/login', login)
export default router