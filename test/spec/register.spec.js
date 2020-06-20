import { registerUser } from "../../src/services/register_service";
import {
    userCredsPass,
    newUserCreds,
    userCredsNoToken,
    userCredsNotAdmin,
    userCredsEmptyToken
} from "../data/test.data";

import { restoreDataToFile } from "../../src/controllers/data_controller";

afterAll(async() => {
    if (await restoreDataToFile()) return "Data restored"
})

describe("Register service test", () => {

    it("Should allow an admin to register a user recored", async() => {
        const registeredUser = await registerUser(newUserCreds[0], userCredsPass[0].token)
        expect(registeredUser.status).toEqual(201);
        expect(registeredUser.body).toEqual("User created");
    });

    it("Should not allow a new user with a alreadt existing email", async() => {
        const registeredUser = await registerUser(userCredsPass[0], userCredsPass[0].token)
        expect(registeredUser.status).toEqual(405);
        expect(registeredUser.body).toEqual(`${userCredsPass[0].email} already exists`);
    });

    it("Should not allow an user without a token to register a user recored", async() => {
        const registerUserNoToken = await registerUser(userCredsNoToken[0], userCredsNoToken[0].token)
        const registerUserEmptyToken = await registerUser(userCredsEmptyToken[0], userCredsEmptyToken[0].token)
        expect(registerUserNoToken.status).toEqual(403);
        expect(registerUserNoToken.body).toEqual("No token");
        expect(registerUserEmptyToken.status).toEqual(403);
        expect(registerUserEmptyToken.body).toEqual("No token");
    });

    it("Should not allow an non admin to register a user recored", async() => {
        const registerUserNotAdmin = await registerUser(userCredsNotAdmin[0], userCredsNotAdmin[0].token)
        expect(registerUserNotAdmin.status).toEqual(403);
        expect(registerUserNotAdmin.body).toEqual("Not admin");
    });


});