import express from "express";
import { gcpStorageImageUpload, gcpAutomlTrigger, imageWebDetect } from "../services/imageUpload";;

var router = express.Router();

router.post("/api/v1/image/upload", async(req, res) => {
    if (!req.files) {
        res.status(204).send("Sorry no image");
    }

    var file = req.files.file;
    var filename = file.name;

    const upload = await gcpStorageImageUpload(file, filename);

    if (upload.status == 202) {
        res.status(202).send(`${filename} has been uploaded`);
    } else {
        res.status(406).send("upload failed");
    }
});


router.post("/api/v1/image/automl", async(req, res) => {
    if (!req.files) {
        res.status(204).send("Sorry no image");
    }

    var file = req.files.file;

    const autoMl = await gcpAutomlTrigger(file.tempFilePath);

    if (autoMl.status == 202) {
        res.status(202).send({ brand: autoMl.shoeBrand });
    } else {
        res.status(406).send("Unknown brand");
    }
});


router.post("/api/v1/image/webdetect", async(req, res) => {
    if (!req.files) {
        res.status(204).send("Sorry no image");
    }

    var file = req.files.file;

    const webDetect = await imageWebDetect(file.tempFilePath);

    console.log(webDetect);

    // if (autoMl.status == 202) {
    //     res.status(202).send({ brand: autoMl.shoeBrand });
    // } else {
    //     res.status(406).send("Unknown brand");
    // }
});

module.exports = router;