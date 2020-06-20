import { userCredsPass, userCredsFail } from "../data/test.data";
import { loginService } from "../../src/services/login_service";

describe("Login service test", () => {
    const userPass = userCredsPass[0];
    const userFail = userCredsFail[0];

    it("Should allow a user the login using correct credentials", async() => {
        const login = await loginService(userPass);
        expect(login.status).toEqual(202);
        expect(login.body).toEqual(`Welcome ${userPass.first_name}`);
    });

    it("Should not allow a user the login using wrong credentials", async() => {
        const login = await loginService(userFail);
        expect(login.status).toEqual(403);
        expect(login.body).toEqual(`Access not allowed`);
    });

});