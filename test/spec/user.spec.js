import { updateUserDetails, deleteUser } from "../../src/services/user_service";
import {
    userCredsPass,
    deleteUserCreds,
    userCredsNoToken,
    userCredsNotAdmin,
    userCredsEmptyToken
} from "../data/test.data";
import { restoreDataToFile } from "../../src/controllers/data_controller";

afterAll(async() => {
    if (await restoreDataToFile()) return "Data restored"
})

describe("user service test", () => {

    it("Should allow an admin to update a user recored", async() => {
        const update = await updateUserDetails(userCredsPass[0], userCredsPass[0].token)
        expect(update.status).toEqual(201);
        expect(update.body).toEqual("Details updated");
    });

    it("Should not allow an user without a token to update a user recored", async() => {
        const updateNoToken = await updateUserDetails(userCredsNoToken[0], userCredsNoToken[0].token)
        const updateEmptyToken = await updateUserDetails(userCredsEmptyToken[0], userCredsEmptyToken[0].token)
        expect(updateNoToken.status).toEqual(403);
        expect(updateNoToken.body).toEqual("No token");
        expect(updateEmptyToken.status).toEqual(403);
        expect(updateEmptyToken.body).toEqual("No token");
    });

    it("Should not allow an non admin to update a user recored", async() => {
        const updateNotAdmin = await updateUserDetails(userCredsNotAdmin[0], userCredsNotAdmin[0].token)
        expect(updateNotAdmin.status).toEqual(403);
        expect(updateNotAdmin.body).toEqual("Not admin");
    });

    it("Should allow an admin to delete a user recored", async() => {
        const deletedUser = await deleteUser(deleteUserCreds[0], userCredsPass[0].token)
        expect(deletedUser.status).toEqual(201);
        expect(deletedUser.body).toEqual(`User removed ${deleteUserCreds[0].first_name} ${deleteUserCreds[0].last_name}`);
    });

    it("Should not allow an user without a token to delete a user recored", async() => {
        const deleteNoToken = await deleteUser(userCredsNoToken[0], userCredsNoToken[0].token)
        const deleteEmptyToken = await deleteUser(userCredsEmptyToken[0], userCredsEmptyToken[0].token)
        expect(deleteNoToken.status).toEqual(403);
        expect(deleteNoToken.body).toEqual("No token");
        expect(deleteEmptyToken.status).toEqual(403);
        expect(deleteEmptyToken.body).toEqual("No token");
    });

    it("Should not allow an non admin to delete a user recored", async() => {
        const deleteNotAdmin = await deleteUser(userCredsNotAdmin[0], userCredsNotAdmin[0].token)
        expect(deleteNotAdmin.status).toEqual(403);
        expect(deleteNotAdmin.body).toEqual("Not admin");
    });
});