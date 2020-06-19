import express from "express";
import { updateUserDetails, deleteUser } from "../services/user_service";
import { userData } from "../controllers/data_controller";
import { tokenFormater } from "../services/auth_service"

var router = express.Router();

//Routes
// GET all Users
router.get("/api/v1/users", async(req, res) => {
    try {
        res.status(200).send(await userData);
    } catch (error) {
        throw error
    }
});


//PATCH Change user details
router.patch("/api/v1/user/update", async(req, res) => {
    try {
        const reqBody = req.body;
        const updateUser = await updateUserDetails(reqBody, await tokenFormater(req.headers.authorization));
        res.status(updateUser.status).send(updateUser.body);
    } catch (error) {
        throw error
    }
});

//DELETE remove user
router.delete("/api/v1/user/remove", async(req, res) => {
    try {
        const reqBody = req.body;
        const deletedUser = await deleteUser(reqBody, await tokenFormater(req.headers.authorization));
        res.status(deletedUser.status).send(deletedUser.body);
    } catch (error) {
        throw error
    }
});

export default router;