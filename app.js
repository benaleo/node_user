import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import mysql from 'mysql';
import dotenv from 'dotenv';
import router from "./routers/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// parse middleware

// parse application/form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static('public'));

// templating engine
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: 'views/partials/'
}));
app.set('view engine', 'hbs');

// router
app.use(router);

// listener check
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});