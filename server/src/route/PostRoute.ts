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
router.post('/',(req,res)=>{
    console.log('pre header');
    console.log('posle header');
    console.log(req.session);
    if(!req.session.user){
        console.log('no user');
        res.json({
            error:'You are not logged in',
           // session:req.session
        });
    }else{
        console.log({user:req.session.user});
        let title=req.body.title;
        let description=req.body.description;
        let category=req.body.category;
        getRepository(Post).insert({author:req.session.user,category:category,description:description,title:title}).then(value=>{
            let id=value.identifiers[0].id;
            res.json({author:req.session.user,category:category,description:description,title:title,id:id})
        })
    }
})
export default router;