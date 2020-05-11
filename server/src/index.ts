import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as session from 'express-session'
import UserRoute from './route/UserRoute'
import PostRoute from './route/PostRoute'
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

    app.use('/*', (req, res, next) => {

        res.status(304);

    })

}).catch(error => console.log(error));
