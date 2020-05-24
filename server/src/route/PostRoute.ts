import { Router } from "express";
import { getRepository } from "typeorm";
import Post from "../entity/Post";
import Comment from "../entity/Comment";
import CommentRoute from './CommentRoute'

const router = Router();
router.use('/:id/comments',CommentRoute);
router.get('/', (req, res) => {
    getRepository(Post).find().then(value => {
        res.json(value);
    })
})

router.post('/',(req,res)=>{
    
    if(!req.session.user){
        res.json({
            error:'You are not logged in',
           // session:req.session
        });
    }else{
        let title=req.body.title;
        let description=req.body.description;
        let category=req.body.category;
        getRepository(Post).insert({author:req.session.user,category:category,description:description,title:title}).then(value=>{
            let id=value.identifiers[0].id;
            res.json({author:req.session.user,category:category,description:description,title:title,id:id})
        })
    }
})
router.patch('/:id',(req,res)=>{
    
})
router.delete('/:id',(req,res)=>{
    console.log(req.params.id)
    getRepository(Post).findOne(req.params.id).then(value=>{
        console.log(value);
        if(value){
            getRepository(Post).delete(req.params.id).then(value=>{
                console.log(value);
                res.json({status:'success'});
            }).catch(value=>{
                res.json({status:'could not delete'});
            })
        }else{
            res.send({status:'not Found'});
        }
    })
})
export default router;