import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";

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

    await mongoose.connect("mongodb://localhost:27017")






    app.get("/", (req, res) => res.render("home"));
    app.get("/login", (req, res) => res.render("login"));
    app.get("/register", (req, res) => res.render("register"));

















    app.listen(3000, () => console.log("Server started on port 3000"));
}