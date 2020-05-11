import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as session from 'express-session'
import UserRoute from './route/UserRoute'
import PostRoute from './route/PostRoute'
import PostCategoryRoute from './route/PostCategoryRoute'
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
createConnection().then(async connection => {

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },

    }))

    app.use('/user', UserRoute);
    app.use('/post', PostRoute);
    app.use('/postCategory', PostCategoryRoute);
    app.use('/*', (req, res, next) => {

        res.status(304);

    })
    app.listen(5000, () => console.log("app is listening"))

}).catch(error => console.log(error));
