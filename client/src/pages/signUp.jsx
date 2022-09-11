//import useRequest from "../hooks/http.hook";
import { useState, useContext } from "react";
import {Redirect} from "react-router-dom";
import Context from "../context/auth.context.js"


const SignUp = () => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [email, setEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const {code, setCode, setUserData} = useContext(Context) // der code, der von Server kommt für die E-Mail Validierung. Der wird hier abgespeichert
  const saveValue = (event) => {
    console.log("change", event.target.name, event.target.value);

    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "password2":
        setPassword2(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      default:
        console.log("error");
    }
  };

  //const request = useRequest();

  const signUp = async (event) => {
    console.log("signing up...");
    event.preventDefault();
    const url = "/signed";
    const message = {
      name,
      password,
      password2,
      email,
    };
    setUserData(message); // nach dem Eingeben der Benutzer daten werden sie sofort im State, der im Context ist gespeichert.
    // damit nach der Validation von Email sofort eine Post anfrage auf den user.routes.js /user/create/ gesendet werden kann

    try {
      let data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
      let result = await data.json();
      if(!data.ok){
        setErrorMessage(`${result.message} bc you are too stupid`); // der State, der den ErrorMessage Tag "aktiviert" hat dann Inhalt und ist true.
        throw new Error("passwords are not equal, validation DAU error");
      }
      console.log("this is result", result);
      console.log("this is result message", result.message);
      setCode(result.code);
      console.log("this is code", result.code);
    }
    catch(error) {
      console.error("error getting data", error)
    }

  };

  return (
    <>
      {code && <Redirect to="/validateSignUp" />}
      <section className="signUp mainSection">
        <form className="signUp__form mainForm">
          <input

            onChange={saveValue}
            className="signUp__input main_input"
            type="text"
            name="name"
            placeholder="please, enter your full name"
            required
          />
          <input
            onChange={saveValue}
            className="signUp__input main_input"
            type="password"
            name="password"
            placeholder="please, make up your password"
            required
          />
          <input
            onChange={saveValue}
            className="signUp__input main_input"
            type="password"
            name="password2"
            placeholder="please, repeat your password"
            required
          />
          <input
            onChange={saveValue}
            className="signUp__input main_input"
            type="email"
            name="email"
            placeholder="please, enter your email"
            required
          />
          <button
            onClick={signUp}
            className="signUp__input signUp__input--button main_button"
            type="submit"
          >
            Let's go
          </button>
          {errorMessage && <p className="errorMessageContainer">{errorMessage}</p>} // wenn der State errorMessage true ergibt, kommt hier ein Fehler Message
        </form>
      </section>
    </>
  );
};

export default SignUp;
