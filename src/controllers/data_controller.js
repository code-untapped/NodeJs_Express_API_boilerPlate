import fs from "fs";

const jsonDataFilePath = "./MOCK_DATA.json";

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