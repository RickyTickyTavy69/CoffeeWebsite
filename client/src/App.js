import Header from "./components/header";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import LogIn from "./pages/logIn/logIn";
import Validate from "./pages/ValidateSignUp";
import Card from "./pages/card/card";
import { BrowserRouter, Route } from "react-router-dom";
import {useState} from "react";
import Footer from "./components/footer";
import Context from './context/auth.context';



function App() {
  const [code, setCode] = useState(null);
  const [verified, setVerified] = useState(false); // wenn der Benutzer den richtigen Code von der eigenen Email
  // eingibt, wird verified true sein und es wird ein Account erstellt.
  const [userData, setUserData] = useState({}); // damit ich den State dann verändern kann und zum Server schicken kann, weil ich noch nicht weiss wie ich
  // daten durch einen <Redirect/> Component übergeben kann.
  //const [userLoginData, setUserLoginData] = useState(null) // Daten, die beim Login mit dem Token von Server kommen und im Client abgespeichert werden.
  //const [jwtToken, setJwtToken] = useState(null);
  const [card, setCard] = useState(null); // die Card jedes Benutzers, wird bei rendern von Component Card vom
  // Server abgefragt.
  return (
      <Context.Provider value={{code, setCode, verified, setVerified, userData, setUserData, card, setCard}}> // создаю контекст с кодом, который буду передавать в другие компоненты,
        // чтобы я мог его забрать в компоненте, в который идёт редирект.
    <BrowserRouter>
      <>
        <Header/>
          <Route path ="/card" component={Card} />
          <Route path ="/login" component={LogIn} />
          <Route path="/validateSignUp" component={Validate} />
          <Route path="/signUp" component={SignUp} />
          <Route exact path="/" component={Home} />
        <Footer />
      </>
    </BrowserRouter>
      </Context.Provider>

  );
}

export default App;
