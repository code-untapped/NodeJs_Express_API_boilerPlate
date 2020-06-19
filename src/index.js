import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

/** 
 * options for cors midddleware
 * Documentation: https://expressjs.com/en/resources/middleware/cors.html
 */
const options = {
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};

const userData = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));

var router = express.Router();

// middleware
app.use(cors());
app.use(express.json());
app.use(router);

app.set("port", process.env.PORT || 8080);

app.options("*", cors(options)); //enable pre-flight

router.get("/", (async(req, res) => { res.send('root'); }));



//Routes
// GET all Users
router.get("/api/v1/users", async(req, res) => {
    try {
        res.status(200).send(userData);
    } catch (err) {
        throw err
    }
});

//POST user login
router.post("/api/v1/login", async(req, res) => {
    const reqBody = req.body;
    let accessBool = false;
    try {
        userData.map(user => {
            if (reqBody.email === user.email && reqBody.password === user.password) {
                accessBool = true;
                res.status(202).send(`Welcome ${user.first_name}`);
            }
        })

        if (!accessBool) {
            res.status(403).send(`Sorry no acess for you ${reqBody.email}`);
        }

    } catch (err) {
        throw err
    }

})

//PATCH Change user details
router.patch("/api/v1/user/update", async(req, res) => {
    let accessBool = false;
    const reqBody = req.body;
    let updatedUser = {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        password: ""
    };

    try {
        userData.map(user => {
            if (reqBody.email === user.email && reqBody.password === user.password) {
                accessBool = true;

                Object.keys(updatedUser).map(detail => {
                    if (reqBody.hasOwnProperty(detail)) {
                        updatedUser[detail] = reqBody[detail];
                    }
                });

                user.first_name = updatedUser.first_name
                user.last_name = updatedUser.last_name
                user.email = updatedUser.email
                user.gender = updatedUser.gender
                user.password = updatedUser.password
            }
        })

        if (accessBool) {
            await fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err) => {
                if (err) throw err;

                res.status(201).send("Details updated");
            })
        } else {
            res.status(403).send(`Sorry no acess for you ${reqBody.email}`);
        }

    } catch (err) {
        throw err
    }
});


//DELETE remove user

//



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