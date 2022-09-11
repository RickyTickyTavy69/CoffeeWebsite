import {Router} from "express"
import userController from "../controllers/user.controller.js";
import bcrypt from "bcrypt";
import config from "config";
import login from "./login.js";
import UserController from "../controllers/user.controller.js";
// ein Prameter zum hashen von Passwort.
let router = Router();
import verifyJWT from "../middleware/verifyJWT.js";

// создание нового пользователя после валидации емэйла.
router.post("/create", async (req, res) => {
    console.log("on server userroutes/create");
    const userData = req.body;
    console.log("user data", userData);
    try{
        let password = userData.password;
        let hashedpassword = await bcrypt.hashSync(password, config.get("bcryptSalt"));     // hashen von password // хэширование пароля.
        userData.password = hashedpassword; // salt befindet sich im config, damit es nicht jedes mal neu erstellt wird, weil dann ist es ja
                                            // jedes mal unterschiedlich.
        await userController.createUser({name: userData.name, password: userData.password, email: userData.email});
        res.status(200).json("user created");

    } catch(error){
        console.log("error in userroutes", error);
        res.status(500).json( {message: error});
    }
});

// логин в уже существующий аккаунт.


router.post("/login", userController.logInUser);

router.post("/showCard", verifyJWT, userController.showCard);

router.post("/addToCard", verifyJWT, userController.addToCard);

router.post("/logout", userController.logout);

router.post("/removeFromCard", verifyJWT, userController.removeFromCard);

export default router;

/*router.route("/showCard").post(verifyJWT, userController.showCard)*/   //это просто ещё один вариант написания.

//// Alles was in den Routes steht bei mir, muss eigentlich in die Controller herein und nur die Anfragen selber, die
//// an die Datenbank Anfragen senden gehören in den Service.
/// damit gehören auch die (req, res) variablen dann in den Controller.