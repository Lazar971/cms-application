import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as basicAuth from 'express-basic-auth';

const userDTO = (user: User) => {
    if (!user) {
        return undefined;
    }
    return {
        category: user.category.value,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        username: user.username,
    }
}
const auth = basicAuth({
    authorizeAsync: true,
    authorizer: (username, password) => {
        return getRepository(User).findOne({
            where: {
                username: username,
                password: password
            }
        })

    }
})
const router = Router();
router.get('/', (req, res) => {

    res.json(req.headers);
    console.log(req);
})
router.post('/', (req, res) => {

    if (req.body.action === 'login') {
        console.log(req);
        getRepository(User).find({
            where: {
                password: req.body.password,
                username: req.body.username
            }
        }).then(value => {

            let user = value[0];
            console.log(user);

            if (user) {
                (req.session as any).user = user;
                req.session.save((err) => { console.log(err) });
                res.json(userDTO(user));
            } else {
                res.json(false);
            }
        })
        return;
    }
    if (req.body.action === 'check') {
        res.json(userDTO(req.session.user));
        return;
    }
    if (req.body.action === 'logout') {
        req.session.destroy((err) => res.json(err));
        res.json(true);
        return;
    }
})

export default router;