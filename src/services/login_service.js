import { userData } from "../controllers/data_controller";

export const loginService = async(body) => {
    let accessBool = false;
    let res = {
        status: 202,
        body: ""
    }
    try {
        await userData.map(user => {
            if (body.email === user.email && body.password === user.password) {
                accessBool = true;
                res.body = `Welcome ${user.first_name}`;
            }
        })

        if (!accessBool) {
            res.status = 403;
            res.body = `Access not allowed`
        }

    } catch (error) {
        throw error
    }

    return res
}