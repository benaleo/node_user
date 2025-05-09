import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import router from "./server/routers/route.js";
import pool from "./server/db/index.js";
// session
import session from 'express-session';
// add flash message alert
import flash from 'connect-flash';
// override method form url action
import methodOverride from 'method-override';
// import route

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// define url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// parse
app.use(methodOverride('_method'));

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
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        eq: function (a, b) {
            return a === b;
        }
    }
}));
app.set('view engine', 'hbs');

// connect db
pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to database');
});

// setup session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// setup flash
app.use(flash());

// router
app.use(router);

// listener check
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

