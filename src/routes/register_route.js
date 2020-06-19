import express from "express";
import { registerUser } from "../services/register_service";
import { tokenFormater } from "../services/auth_service";

var router = express.Router();

//POST register user
router.post("/api/v1/register", async(req, res) => {
    try {
        const reqBody = req.body;
        const register = await registerUser(reqBody, await tokenFormater(req.headers.authorization));
        res.status(register.status).send(register.body);

    } catch (error) {
        throw error

    }
})

export default router;