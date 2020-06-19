import { userData } from "../controllers/data_controller";

export const isAdmin = async(token) => {
    await userData.map(user => {
        if (user.token === token) {
            return true
        }
    });
};

export const tokenFormater = async(token) => {
    return token.replace("Bearer ", "")
};