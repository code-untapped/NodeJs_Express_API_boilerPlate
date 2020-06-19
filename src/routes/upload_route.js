import express from "express";
import { tokenFormater } from "../services/auth_service";
import { imageUpload } from "../services/imageUpload_service";

var router = express.Router();

router.post("/api/v1/image/upload", async(req, res) => {

    // console.log(req.file.)
    console.log(req)
        // if (!req.files.file) {
        //     res.status(204).send("Sorry no image");
        // }

    // var file = req.files.file;

    // try {
    //     await imageUpload(file, await tokenFormater(req.headers.authorization));
    //     res.status(200).send(`Image ${file.filename} ahs been uploaded`);

    // } catch (error) {
    //     throw error
    // }

});

export default router;