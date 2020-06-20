import fs from "fs";
import 'regenerator-runtime/runtime';

const jsonDataFilePath = "./MOCK_DATA.json";
const jsonDataCopyFilePath = "./MOCK_DATA_backup.json";

export const userData = JSON.parse(fs.readFileSync(jsonDataFilePath));

export const writeToFile = async(data) => {
    try {
        await fs.writeFile(jsonDataFilePath, JSON.stringify(data), (err) => {
            if (err) throw err;
        });

    } catch (error) {
        throw error;
    }
    return {
        status: 201,
        body: "Details updated"
    }

};

export const restoreDataToFile = async() => {

    fs.unlink(jsonDataFilePath, (err) => {
        if (err) throw err;
    });


    const jsonDataCopy = JSON.parse(fs.readFileSync("./MOCK_DATA_backup.json"));

    try {
        await fs.writeFile(jsonDataFilePath, JSON.stringify(jsonDataCopy), (err) => {
            if (err) throw err;
        });

    } catch (error) {
        throw error;
    }
    return true
};