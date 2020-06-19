import express from "express";
import cors from "cors";
import login from "./routes/login_route";
import users from "./routes/users_route";
import register from "./routes/register_route";

const app = express();

/** 
 * options for cors midddleware
 * Documentation: https://expressjs.com/en/resources/middleware/cors.html
 */
const options = {
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};

var router = express.Router();

// middleware
app.use(cors());
app.use(express.json());
app.use(router);

app.set("port", process.env.PORT || 8080);

app.options("*", cors(options)); //enable pre-flight

app.use(login);
app.use(users);
app.use(register);
// app.use(search);
// app.use(upload);


// This root is needed if you want to run this in the cloud
router.get("/", (async(req, res) => { res.send('root'); }));

try {
    app.listen(app.get("port"), () => {
        console.log("the server is running on port",

            app.get("port")
        );
    });

} catch (err) {
    console.log(err);
}

/// do a GET, PUT, POST, DELETE example for the mock json data