import express from "express";
import cors from "cors";

const app = express();

/** 
 * options for cors midddleware
 * Documentation: https://expressjs.com/en/resources/middleware/cors.html
 */
const options = {
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};

// middleware
app.use(cors(options));
app.use(express.json());

app.set("port", process.env.PORT || 8080);

app.options("*", cors(options)); //enable pre-flight

app.get("/", ((req, res) => { res.send('root'); }));

// app.use(users);
// app.use(login);
// app.use(register);
// app.use(search);
// app.use(upload);

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