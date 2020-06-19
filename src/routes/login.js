import express from "express";

var router = express.Router();

router.post("/api/v1/login", async(req, res) => {
    const reqBody = req.body;
    try {
        const searchUser = await Users.find({ email: reqBody.email, password: reqBody.password });
        if (searchUser.length == 0) {
            res.status(400).send('sorry no user');
        } else {
            res.status(302).send(`Welcome back ${reqBody.email}`);
        }
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

export default router;