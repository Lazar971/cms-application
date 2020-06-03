import { Router } from "express";
import { getRepository } from "typeorm";
import Post from "../entity/Post";
import CommentRoute from './CommentRoute'
import Comment from "../entity/Comment";

const router = Router();

router.get('/', (req, res) => {
    getRepository(Post).find().then(value => {
        res.json(value);
    })
})

router.post('/', (req, res) => {

    if (!req.session.user) {
        res.json({
            error: 'You are not logged in',
            // session:req.session
        });
    } else {
        let title = req.body.title;
        let description = req.body.description;
        let category = req.body.category;
        getRepository(Post).insert({ author: req.session.user, category: category, description: description, title: title }).then(value => {
            let id = value.identifiers[0].id;
            res.json({ author: req.session.user, category: category, description: description, title: title, id: id })
        })
    }
})
router.patch('/:id', (req, res) => {

})
router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    getRepository(Post).findOne(req.params.id).then(value => {
        console.log(value);
        if (value) {
            getRepository(Post).delete(req.params.id).then(value => {
                console.log(value);
                res.json({ status: 'success' });
            }).catch(value => {
                res.json({ status: 'could not delete' });
            })
        } else {
            res.send({ status: 'not Found' });
        }
    })
})
router.get('/:id/comments', (req, res) => {
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
});
router.post('/:id/comments', (req, res) => {
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
router.delete('/:id/comments/:comment', (req, res) => {
    getRepository(Comment).findOne({
        where: {
            id: parseInt(req.params.comment),
            post: {
                id: parseInt(req.params.id)
            }
        }
    }).then(value => {
        console.log(value)
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
        res.json({ status: 'deleted' });
    })
})
export default router;