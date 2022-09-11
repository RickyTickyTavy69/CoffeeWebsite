import {Router} from "express";
let router = Router();

router.get('/', async (req, res) => {
    
    res.render('auth/signUp', {
        title: 'Register Yourself',
        isSignUp: true
    });
})


export default router;