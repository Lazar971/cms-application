import { Router } from "express";
import { getRepository } from "typeorm";
import Post from "../entity/Post";
import Comment from "../entity/Comment";


const router = Router();

router.get('/', (req, res) => {
    getRepository(Post).find().then(value => {
        res.json(value);
    })
})
router.get('/:id/comments', (req, res) => {
    getRepository(Comment).find({
        where: {
            post: {
                id: req.params.id
            }
        }
    }).then(value => {
        res.json(value);
    })
})

export default router;