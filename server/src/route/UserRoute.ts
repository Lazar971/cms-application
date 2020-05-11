import { Router } from "express";


const router = Router();

router.get('/', (req, res) => {
    if (req.session) {
        let user = req.session.user;
    }
})


export default router;