import User from "../models/userModel.js"
import config from "config";
import tokensCreator from "../core/utils/tokensCreator.js";
import UserController from "../controllers/user.controller.js";

class UserService{

    static createNew = async (userData) => {
        console.log("creating new User", userData, "cart", userData.cart, "token", userData.refreshToken);
        try{
            let newUser = new User({
                email: userData.email,
                name : userData.name,
                password: userData.password,
                cart: userData.cart,
                refreshToken: userData.refreshToken
            });
            await newUser.save();
        } catch(error){
            console.log("error in UserService", error);
        }

    }

    static logInUser = async (loginData) => {
        const accessSecret = config.get("jwtSecret");
        const refreshSecret = config.get("jwtSecret");
        console.log("login user, this is name", loginData.name);
        const jwtTokens = await tokensCreator.createTokens( JSON.stringify(loginData.name), accessSecret, refreshSecret);
        console.log("created jwt tokens", jwtTokens);
        return jwtTokens;
    }

    static getUser = async (loginData) => {
        console.log("this is name in getUser", loginData.name);
        const user = await User.findOne( {name : loginData.name} );
        console.log("user service, get user", user);
        return user;
    }

    static deleteUser = async (username) => {
        console.log("deleting user", typeof username);
            // seltsam, dass diese Methode ohne einem callback nicht funktioniert. Das ist doch eine veraltete
        // schreibweise? Bei den anderen muss man keinen callback hinzufügen.
        User.deleteOne({name: username}, (err, result) => {
            if (err){
                console.log("error with deleting", err);
            } else if (result) {
                console.log("deleting result", result);
            }
        });
    }

    static updateUser = async (userName, key, value) => {
        try{
            let userForUpdate = await User.findOne({name: userName});
            console.log("user for update found", userForUpdate);
            console.log("key, value", key, value);
            let newUserForUpdate = {...userForUpdate, key: value};
            console.log("new user for update", newUserForUpdate);
            await UserService.deleteUser(userName);
            let newUser = new User({
                email: newUserForUpdate._doc.email,
                name: newUserForUpdate._doc.name,
                password: newUserForUpdate._doc.password,
                refreshToken : newUserForUpdate.key,
                cart: newUserForUpdate._doc.cart
            });
            console.log("new user", newUser);
            await newUser.save();
        } catch(error) {
            console.log("error in user service,");
        }
    }

    static async logout(username){
        console.log("logout", username);
        let user = await UserService.getUser({name: username});
        console.log("@ logout", user);
        user.refreshToken = "";
        console.log("addToCard, new user", user);
        await UserService.deleteUser(username);
        await UserController.createUser(user);
    }
}

export default UserService;