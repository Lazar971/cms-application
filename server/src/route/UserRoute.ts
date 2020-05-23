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
    
    if (req.body.action === 'login') {
        getRepository(User).find({
            where:{
                password:req.body.password,
                username:req.body.username
            }
        }).then(value => {
           
            let user = value[0];

           
            if (user) {
                (req.session as any).user=user;
                req.session.save((err)=>{console.log(err)});
                console.log(req.session);
                res.json(user);
            } else {
                res.json(false);
            }
        })
        return;
    }
    if (req.body.action === 'check'){
        res.json(req.session.user);
        return;
    }
})

export default router;