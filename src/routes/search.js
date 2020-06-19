import express from "express";
import { gseSearchLogic } from "../services/gseSearchLogic";

var router = express.Router();

router.post("/api/v1/image/search/:query", async(req, res) => {

    try {
        const search = await gseSearchLogic(req.params.query);
        res.status(200).send(search);

    } catch (err) {
        res.send(JSON.stringify(err));
    }
});

export default router;