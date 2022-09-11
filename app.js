import express from "express";
import config from "config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; // httpOnly Cookies, die mit Credentials gesendet wurden, lesen.


//============================================================//
import session from "express-session";
//let MongoStore = require("connect-mongodb-session")(session);
//============================================================//

/*const User = require("./models/userModel");*/
//import Menu from "./models/menuModel.js";

//===============================================================//

import signUpRoutes from "./routes/signUp.js";
import {signedRoutes} from "./routes/signed.js";
const signedRouter = signedRoutes.router;
import codeRoutes from "./routes/code.js"
import loginRoutes from "./routes/login.js";
import varMiddleware from "./middleware/variables.js"

import userRoutes from "./routes/user.routes.js";
//=================================================================//

//===========================================================//
import homeRoutes from "./routes/home.js";
import ordersRoutes from "./routes/orders.js";
//============================================================//

import cardRoutes from "./routes/card.js";


//=============================================//

let app = express();

const PORT = config.get("port");

let port = 5000; /*process.env.PORT || PORT || 3000*/

let mongoURL =
  "mongodb://Artem:hailtotheking666@cluster0-shard-00-00.cqwfy.mongodb.net:27017,cluster0-shard-00-01.cqwfy.mongodb.net:27017,cluster0-shard-00-02.cqwfy.mongodb.net:27017/?ssl=true&replicaSet=atlas-ojmnnw-shard-0&authSource=admin&retryWrites=true&w=majority";

/*const store = new MongoStore({
  collection: "sessions", // название коллекции, которая будет добавляться в MongoDB.
  uri: mongoURL,
});*/

//===================================================// подключение к базе данных

async function start() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    /*let findMenu = await Menu.findOne(); // создаёт меню на основе menuModel.js*/
    /*if (!findMenu) {
      let menu = new Menu();
      menu.addAllItems();
    }*/

    app.listen(port, () =>
      console.log(`the server is working on port ${port}`)
    ); // сервер запускается только после подключения к бд.
  } catch (e) {
    ////не уверен, нужент ли здесь await Но владилен так показал
    console.log("Server Error", e.message);
    process.exit(1); // не знаю точно, что это
  }
}

start();

/*const hbs = exphbs.create({
  deafultLayout: "main",
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true, // без этого возникала ошибка при обработке объекта из базы данных.
    allowProtoMethodsByDefault: true,
  },
});



//app.use("/public", express.static(path.join(__dirname, "public")));

//app.use(express.urlencoded({ extended: false }));

//настройка сессии.   Теперь сессия всегда будет находится в req, так как эта функция её туда добавляет.

/*app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store, // вообще store: store, но так как значение и свойство одинаковые, можно избавиться от значения.
  })
);*/

/*app.use(varMiddleware);*/

//==============================================================================================================================//

app.use(express.json());                      /// это важно, это json parser для express.

app.use(cookieParser());                      /// das ist hier, um die HTTP-only Cookies zu holen.

app.use("/user", userRoutes);

app.use("/", homeRoutes);

app.use("/signUp", signUpRoutes);

app.use("/signed", signedRouter);

app.use("/code", codeRoutes);

app.use("/login", loginRoutes);

app.use("/myCard", cardRoutes);

app.use("/orders", ordersRoutes);



//=============================================//
