import { model, Schema } from 'mongoose';

var UsersSchema = new Schema({
    fullname: String,
    username: String,
    email: Array,
    password: String,
});

export var Users = model("users", UsersSchema);