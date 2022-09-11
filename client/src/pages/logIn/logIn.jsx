import useRequest from "../../hooks/http.hook";
import { useState, useContext } from "react";
import {Redirect} from "react-router-dom";
import Context from "../../context/auth.context.js";
import loginStyles from "./login.module.css";



const LogIn = () => {
    const request = useRequest();
    const [logInUser, setLogInUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const {setUserData, userData} = useContext(Context);             // der code, der von Server kommt für die E-Mail Validierung. Der wird hier abgespeichert

    const saveValue = (event) => {
        console.log("change", event.target.name, event.target.value);
        userData[event.target.name] = event.target.value;
    }

    const logIn = async (event) => {
        console.log("on react login...");
        event.preventDefault();
        let message = {
            name: userData.name,
            password: userData.password,
        };
        const url = "/user/login";
        try {
            console.log("sending user data", message);
            let response = await request("POST", url, JSON.stringify(message));
            if(!response.ok){
                let data = await response.json();   // falls der Passwort/Login falsch ist, dann wird ein Fehler
                setErrorMessage(data.message);      // Message angezeigt
                console.log("on react response jwt", data.message);
                throw new Error("error on server");
            } else {                //wenn response.ok true ist, dann wird mit dem Token, der von Server kommt
                let data = await response.json(); // gearbeitet
                console.log("on react response AccessToken", data.accessToken);
                let accessToken = data.accessToken;
                let username = data.username;

                console.log("setting items...username", username);
                localStorage.setItem("username", JSON.stringify(username));
                localStorage.setItem("jwtToken", JSON.stringify(accessToken));
                //console.log("cookie", document.cookie);
                setLogInUser(true);
            }

        } catch(error) {
            console.error("error getting data", error);
        }

    };

    return (
        <>
            {logInUser && <Redirect to="/"/>}                           {/* wenn einer eingeloggt wurde, wird man auf die Homepage redirected.*/}
            <section className={loginStyles.logInSection}>
                <form className={loginStyles.logInForm}>
                    <input
                        onChange={saveValue}
                        className={loginStyles.logInInput}
                        type="text"
                        name="name"
                        placeholder="please, enter your name"
                        required
                    />
                    <input
                        onChange={saveValue}
                        className={loginStyles.logInInput}
                        type="password"
                        name="password"
                        placeholder="please, enter your password"
                        required
                    />
                    <button
                        onClick={logIn}
                        className={loginStyles.logInButton}
                        type="submit"
                    >
                        Log In
                    </button>
                </form>
                {errorMessage && <p className={loginStyles.errorMessageContainer}>{errorMessage}</p>}
            </section>
        </>
    );
};

export default LogIn;
