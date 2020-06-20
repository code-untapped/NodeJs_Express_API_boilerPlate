import { userCredsPass, userCredsFail } from "../data/test.data";
import { isAdmin, tokenFormater } from "../../src/services/auth_service";

describe("auth service test", () => {
    const userPassToken = userCredsPass[0].token;

    it("Should return a token not contain Bearer", async() => {
        const token = await tokenFormater(userPassToken);
        expect(token).toEqual(userPassToken.replace("Bearer ", ""));
    });

    it("Should verify if the user is admin", async() => {
        const admin = await isAdmin(userPassToken.replace("Bearer ", ""));
        expect(admin).toBeTruthy();
    });

});