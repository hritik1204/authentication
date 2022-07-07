import express from "express";
import ejs from "ejs";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { response } from "express";


main().catch(err => console.log(err));
async function main() {

    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.set('view engine', 'ejs');

    const __filename = fileURLToPath(
        import.meta.url);

    const __dirname = dirname(__filename);
}