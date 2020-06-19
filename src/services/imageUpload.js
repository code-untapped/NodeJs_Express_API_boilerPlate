import { Storage } from "@google-cloud/storage";
import automl from "@google-cloud/automl";
import vision from "@google-cloud/vision";
import fs from "fs";

export const gcpStorageImageUpload = async(file, filename) => {
    const res = {
        status: 202,
        send: `${filename} has been uploaded`
    }

    try {
        const gcpStorage = new Storage({
            keyFilename: "./cloud-storage-account-details.json",
            projectId: "sole-glow-api"
        });

        const bucketName = "sole-glow-img-bucket";

        await gcpStorage.bucket(bucketName).upload(file.tempFilePath);

        return res

    } catch (err) {
        throw err
    }
};

export const gcpAutomlTrigger = async(file) => {
    const client = new automl.PredictionServiceClient({
        projectId: "sole-glow-api",
        keyFile: "./automl-service-account.json"
    });

    const projectId = "sole-glow-api";
    const modelId = "ICN981505442813313024";
    const computeRegion = "us-central1";
    const scoreThreshold = "0.5";

    // Get the full path of the model.
    const modelFullId = client.modelPath(projectId, computeRegion, modelId);

    // Read the file content for prediction.
    const content = fs.readFileSync(file, 'base64');

    const params = {};

    if (scoreThreshold) {
        params.score_threshold = scoreThreshold;
    }

    // Set the payload by giving the content and type of the file.
    const payload = {
        image: {
            imageBytes: content
        }
    };

    try {
        // params is additional domain-specific parameters.
        // currently there is no additional parameters supported.
        const [response] = await client.predict({
            name: modelFullId,
            payload: payload,
            params: params,
        });

        const res = {
            status: 202,
            shoeBrand: ""
        };

        console.log('Prediction results:');
        response.payload.forEach(result => {
            console.log(`Predicted class name: ${result.displayName}`);
            console.log(`Predicted class score: ${result.classification.score}`);
            res.shoeBrand = result.displayName;
        });

        return res

    } catch (err) {
        throw err
    }


}

export const imageWebDetect = async(file) => {

    console.log(file);

    const client = new vision.ImageAnnotatorClient({
        projectId: "sole-glow-api",
        keyFile: "./automl-service-account.json"
    });

    const [result] = await client.webDetection(file);
    const webDetection = result.webDetection;

    console.log(webDetection);

}