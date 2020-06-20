import { v4 as uuidv4 } from "uuid";
import { userData, writeToFile } from "../controllers/data_controller";
import { isAdmin } from "../services/auth_service";

export const registerUser = async(newUser, token) => {
    if (!token || token.length === 0) return {
        status: 403,
        body: "No token"
    }

    if (await !isAdmin(token)) return {
        status: 403,
        body: "Not admin"
    }



    let duplicateUser = false;

    if (await isAdmin(token) === true) {

        try {
            userData.map(user => {
                if (user.email === newUser.email) {
                    duplicateUser = true;
                }
            });

            if (!duplicateUser) {
                let lastUserId = (userData[userData.length - 1].id) + 1;

                userData.push({
                    id: lastUserId,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    gender: newUser.gender,
                    password: newUser.password,
                    admin: newUser.admin,
                    token: uuidv4()
                });

                const updateData = await writeToFile(userData);

                if (updateData.status === 201) return {
                    status: 201,
                    body: "User created"
                }

            } else {
                return {
                    status: 405,
                    body: `${newUser.email} already exists`
                }
            }

        } catch (error) {
            throw error
        }
    } else return {
        status: 403,
        body: "Not admin"
    }
};