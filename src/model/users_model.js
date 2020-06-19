import { model, Schema } from 'mongoose';

var UsersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    password: String
});

export var Users = model("users", UsersSchema);