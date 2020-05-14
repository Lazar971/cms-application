import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";


const router = Router();

router.get('/', (req, res) => {
    if (req.session) {
        let user = req.session.user;
    }
})
router.post('/', (req, res) => {
    console.log(req.body);
    if (req.body.action === 'login') {
        getRepository(User).find().then(value => {
            console.log(req.body);
            let user = value.find(element => element.username === req.body.username && element.password === req.body.password);
            console.log(user);
            if (user) {
                res.json(user);
            } else {
                res.json(false);
            }
        })
    }

})

export default router;