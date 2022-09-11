import {Router} from "express";
let router = Router();
import mailer from "../core/utils/nodemailer.js";
import code from "../core/utils/validation.js";

router.post("/", async (req, res) => {
  console.log("on server", req.body);
  const userData = req.body;
  if(userData.password !== userData.password2){
    return res.status("500").json({message: "passwords are not equal"});
  }
  if (!req.body) return res.sendStatus(400);
  let message = {
    from: "Coffe Shop <bakirovartem69@gmail.com>",
    to: `${req.body.email}`,
    subject: "Email Verificaton",
    text: `your email verification code is ${code} Please, enter this code to verificate your email.
        Thank you for your registration and have a good day!
        Your Coffee Shop.`,
  };
  await mailer(message);
  await res.status("200").json({message: "sign up successful", code});
});

export const signedRoutes = { router: router, code: code };
