import { userData } from "../controllers/data_controller";

export const isAdmin = async(token) => {
    var admin = false;

    await userData.map(user => {
        if (user.token === token && user.admin === true) {
            admin = true;
        }
    });

    return admin
};

export const tokenFormater = async(token) => {
    return token.replace("Bearer ", "")
};