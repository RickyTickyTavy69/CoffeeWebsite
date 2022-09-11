import {Router} from "express";
let router = Router();
import {signedRoutes} from "./signed.js"
let code = signedRoutes.code;

router.post('/', function(req, res){
    let codeValidation = (code === req.body.validationCode);
    res.render('auth/signedValidation', {'codeValidation' : codeValidation});
})


export default router;