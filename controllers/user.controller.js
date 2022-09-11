import UserService from "../service/user.service.js";
import userService from "../service/user.service.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import config from "config";

class UserController{

    static createUser = async (userData) => {
        await UserService.createNew(userData);
    }

    static logInUser = async (req, res) => {
        console.log("on server userrouter/login")
        const loginData = req.body;
        //const salt = bcrypt.genSaltSync(10);
        console.log("login data", loginData);
        try{
            let userObj = await UserController.getUserPassword(loginData);
            let passworddb = userObj.DbPassword;
            let user = userObj.user
            let username = userObj.user.name;
            let hashedinputPassword = bcrypt.hashSync(loginData.password, config.get("bcryptSalt"));
            if(passworddb !== hashedinputPassword){         // hier passwörter vergleichen
                throw new Error("false login or password, try again. Stupid.");
            }
            let jwtTokens = await UserService.logInUser(loginData);
            const accessToken = jwtTokens.accessToken;
            const refreshToken = jwtTokens.refreshToken;
            await UserController.updateUser(user.name, "refreshToken", refreshToken);
            // refresh Token wird in die Cloud Datenbank (MongoDB) gespeichert und kann dann genauso wieder gelöscht werden
            // wenn der Benutzer sich ausloggt.
            res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            // somit wird der refreshToken per cookie an den Front End gesendet und der AccessToken mit JSON.
            // Man braucht im Front End diese beiden Tokens, weil der AccessToken jedes Mal wenn er expired ist,
            // sich wieder erneuert und dafür den RefreshToken auf dem Client nutzt.
            // Es muss ein httpOnly Cookie sein, da es sonst sehr leicht gelesen werden kann und das macht die App unsicher.
            res.status(200).json({message: "jwt created", username: username, accessToken: accessToken});
        }catch(error){
            console.log("error in userroutes", error);
            res.status(500).json( {error: error, message: "false login or password, try again. Stupid."});
        }
    }

    static getUserPassword = async (loginData) => {
        let user = await userService.getUser(loginData);
        let DbPassword = user.password;
        return {user, DbPassword};
    }

    static updateUser = async (username, key, value) => {
        try{
            await userService.updateUser(username, key, value);
            //console.log("user controller user updated");
        } catch(error) {
            console.log("error updating user,", error);
        }
    }

    static showCard = async (req, res) => {
        console.log("on server, showCard");
        const username = req.user;
        console.log("this is username", username);
        let user = await userService.getUser({name: username});
        let cart = user.cart.items;
        const accessToken = req.accessToken? req.accessToken: null;
        res.status(200).json({cart, accessToken});
        console.log("on server Showcard, this is user", user);
    }

    static addToCard = async(req, res) => {
        console.log("on server, addToCard");
        let data = req.body;
        console.log("data addtoCard", data.productInfo);
        let name = data.productInfo.split(",")[0];
        let price = data.productInfo.split(",")[1];
        console.log("name, price", name, price);
        const username = req.user;
        let user = await userService.getUser({name: username});
        console.log("addToCard this is user", user);
        let cart = user.cart.items;
        cart.push({
            type: name,
            price: price,
            amount: 1
        });
        user.cart.items = cart;
        console.log("addToCard, new user", user);
        await UserService.deleteUser(username);
        await UserController.createUser(user);
        const accessToken = req.accessToken? req.accessToken: null;
        res.status(200).json({accessToken});
    }

    static async removeFromCard(req, res){
        console.log("@ removeFromCard");
        const productId = req.body.productId;
        console.log("productID", productId);
        const username = req.user;
        const user = await userService.getUser({name: username});
        const cart = user.cart.items;
        const newCart = cart.filter( (product) => {
            console.log("ids", product._id, productId);
            return product._id.toString() !== productId;
        })
        console.log("new Cart", newCart);
        user.cart.items = newCart;
        await UserService.deleteUser(username);
        await UserController.createUser(user);
        const accessToken = req.accessToken? req.accessToken: null;
        res.status(200).json({accessToken, newCart});
    }

    static logout = async(req, res) => {
        const username = req.body.username;
        await UserService.logout(username);
    }
}

export default UserController;