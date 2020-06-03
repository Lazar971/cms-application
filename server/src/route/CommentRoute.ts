import { Router } from "express";
import { getRepository } from "typeorm";
import Comment from "../entity/Comment";
import Post from "../entity/Post";

const router = Router();
router.get('/', (req, res) => {
    console.log('get');
    console.log(req.params);
    console.log(req.body);
    getRepository(Comment).find({
        where: {
            post: {
                id: req.params.id
            }
        }
    }).then(value => {
        console.log(value);
        res.json(value);
    })
})
router.post('/', (req, res) => {
    getRepository(Post).findOne(req.params.id).then(post => {
        const content = req.body.content;

        getRepository(Comment).insert({ content: content, post: post, user: req.session.user }).then(value => {

            return getRepository(Comment).findOne({
                where: {
                    id: value.identifiers[0].id,
                    post: {
                        id: post.id
                    }
                }
            });
        }).then(value => {
            console.log(value);
            res.json(value);
        })
    })
})
router.delete('/:comment', (req, res) => {
    getRepository(Comment).findOne({
        where: {
            id: req.params.comment,
            post: {
                id: req.params.id
            }
        }
    }).then(value => {
        if (!value) {
            res.json({ status: 'not found' });
            return;
        }
        return getRepository(Comment).delete({
            id: parseInt(req.params.comment),
            post: {
                id: parseInt(req.params.id)
            }
        })
    }).then(value => {
        res.json({ status: 'not found' });
    })
})
export default router;