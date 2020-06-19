import express from "express";

var router = express.Router();

router.post("/api/v1/register", async(req, res) => {
    const reqBody = req.body;

    try {
        const registerUser = await Users.find({ email: reqBody.email });

        if (registerUser.length < 0) {
            res.status(302).send("This user already exists");
        } else {
            const newUser = new Users({ reqBody });
            await newUser.save();
            res.status(201).send("User registered");
        }

    } catch (err) {
        console.log(err);
        res.status(304).send("User not registered");
    }
});

export default router;