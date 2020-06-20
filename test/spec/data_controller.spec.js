import { registerUser } from "../../src/services/register_service";
import {
    userCredsPass,
    newUserCreds,
    userCredsNoToken,
    userCredsNotAdmin,
    userCredsEmptyToken
} from "../data/test.data";

import { restoreDataToFile, writeToFile } from "../../src/controllers/data_controller";

afterAll(async() => {
    if (await restoreDataToFile()) return "Data restored"
})

xdescribe("Data controller test", () => {

    xit("Should allow an write to file", async() => {
        const registeredUser = await registerUser(newUserCreds[0], userCredsPass[0].token)
        expect(registeredUser.status).toEqual(201);
        expect(registeredUser.body).toEqual("User created");
    });

    xit("Should allow an restore to file", async() => {
        const registeredUser = await registerUser(newUserCreds[0], userCredsPass[0].token)
        expect(registeredUser.status).toEqual(201);
        expect(registeredUser.body).toEqual("User created");
    });




});