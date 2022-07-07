import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";


/////////////////////////////////

import { createRequire } from "module";
const require = createRequire(
    import.meta.url);
const yourData = require("./package.json");

const encrypt = require('mongoose-encryption');

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { response } from "express";


main().catch(err => console.log(err));
async function main() {
    /////////////////////////////////////////////////////////////////
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.set('view engine', 'ejs');

    const __filename = fileURLToPath(
        import.meta.url);

    const __dirname = dirname(__filename);

    //////////////////     Mongoose    ////////////////////////////////

    await mongoose.connect("mongodb://localhost:27017/userDB");

    const userSchema = new mongoose.Schema({
        email: String,
        password: String
    });

    const secret = "Thisisourlittlesecret.";

    userSchema.plugin(encrypt, { secret: secret, excludeFromEncryption: ["email"] });
    const User = mongoose.model("User", userSchema);









    app.get("/", (req, res) => res.render("home"));
    app.get("/login", (req, res) => res.render("login"));
    app.get("/register", (req, res) => res.render("register"));


    ////////// Register route///////////////
    app.post("/register", (req, res) => {

        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        newUser.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.render("secrets");
            }
        });
    });

    ////////// Login route///////////////
    app.post("/login", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;


        User.find({ email: username }, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    if (foundUser.password === password) {
                        res.render("secrets");
                    }
                }
            }
        })
    })











    app.listen(3000, () => console.log("Server started on port 3000"));
}