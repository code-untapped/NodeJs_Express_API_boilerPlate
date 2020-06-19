import { Users } from "../model/users_model";

export const getUsers = async(req, res) => {
    try {

        const searchUsers = await Users.find({});

        console.log(searchUsers);

        res.send('here are users');
    } catch (err) {
        console.log(err)
    }
};

export const postUsers = async(req, res) => {
    try {
        res.send('posting users');
    } catch (err) {
        console.log(err)
    }
}