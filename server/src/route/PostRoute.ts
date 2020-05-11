import { Router } from "express";
import { getRepository } from "typeorm";
import Post from "../entity/Post";


const router = Router();

router.get('/', (req, res) => {
    getRepository(Post).find().then(value => {
        res.json(value);
    })
})


export default router;