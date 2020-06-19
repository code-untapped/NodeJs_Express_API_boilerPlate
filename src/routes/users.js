import express from "express";
import {  Users } from "../model/users_model";

var router = express.Router();

router.get("/api/v1/users", async(req, res) => {
    try {
        const allUsers = await Users.find({});
        res.send(allUsers);
    } catch (err) {
        console.log(err);
        res.status(500).send("Sorry but can not get users from db");
    }
});

export default router;