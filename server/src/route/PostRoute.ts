import { Router } from "express";
import { getRepository } from "typeorm";
import Comment from "../entity/Comment";
import Post from "../entity/Post";
import * as convert from 'xml-js'
const router = Router();

router.get('/', (req, res) => {

    getRepository(Post).find().then(value => {
        if (req.headers["content-type"] === 'application/xml') {
            res.send(convert.js2xml(value));
        } else {
            res.json(value);
        }
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
    getRepository(Post).findOne(req.params.id).then(value => {
        if (!value) {
            res.json({
                status: 'Not found'
            });
        } else {
            return getRepository(Post).update(req.params.id, req.body.post);
        }
    }).then(value => {
        return getRepository(Post).findOne(req.params.id)
    }).then(value => {
        res.json({
            status: 'ok',
            post: value
        });
    })
})
router.delete('/:id', (req, res) => {
    getRepository(Post).findOne(req.params.id).then(value => {
        if (value) {
            getRepository(Post).delete(req.params.id).then(value => {
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
    getRepository(Comment).find({
        where: {
            post: {
                id: req.params.id
            }
        }
    }).then(value => {
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