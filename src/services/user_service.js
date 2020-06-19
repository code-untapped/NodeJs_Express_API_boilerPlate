import { userData, writeToFile } from "../controllers/data_controller";
import { isAdmin } from "../services/auth_service";

export const updateUserDetails = async(userDetails, token) => {
    if (!token || token.length === 0) return {
        status: 403,
        body: "No token"
    }

    if (await !isAdmin(token)) return {
        status: 403,
        body: "Not admin"
    }

    let accessBool = false;
    let updatedUser = {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        password: ""
    };

    try {
        userData.map(user => {
            if (userDetails.email === user.email && userDetails.password === user.password) {
                accessBool = true;

                Object.keys(updatedUser).map(detail => {
                    if (userDetails.hasOwnProperty(detail)) {
                        updatedUser[detail] = userDetails[detail];
                    }
                });

                user.first_name = updatedUser.first_name;
                user.last_name = updatedUser.last_name;
                user.email = updatedUser.email;
                user.gender = updatedUser.gender;
                user.password = updatedUser.password;
            }
        });

        if (accessBool) {
            const updateData = await writeToFile(userData);
            if (updateData.status === 201) return updateData
        } else {
            return {
                status: 403,
                body: `Sorry no access for you ${userDetails.email}`
            }
        }

    } catch (error) {
        throw error
    }

};

export const deleteUser = async(userToDelete, token) => {

    if (!token || token.length === 0) return {
        status: 403,
        body: "No token"
    }

    if (await !isAdmin(token)) return {
        status: 403,
        body: "Not admin"
    }

    let accessBool = false;
    try {
        userData.map((user, idx) => {
            if (userToDelete.email === user.email && userToDelete.password === user.password) {
                accessBool = true;
                userData.splice(idx, 1);
            }
        });

        if (accessBool) {
            const updateData = await writeToFile(userData);
            if (updateData.status === 201) return {
                status: 201,
                body: `User removed ${userToDelete.first_name} ${userToDelete.last_name}`
            }
        } else {
            return {
                status: 403,
                body: `Sorry no acess for you ${userDetails.email}`
            }
        }

    } catch (error) {
        throw error
    }

};