import {Router} from "express";
const router = Router();
import path from "path";
import fs from "fs";




router.get('/', async (req, res) => {
    
    let totalprice = 0;

    res.render('index', {
        title: 'Best Coffee In Town',
        isHome: true
    });

})


export default router;