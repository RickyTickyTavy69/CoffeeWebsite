import {useContext, useState} from "react";
import Context from "../context/auth.context.js"
import useRequest from "../hooks/http.hook.js";

const ValidateSignUp = () => {
  const request = useRequest();
  const {code, verified, setVerified, userData} = useContext(Context); // стейт создаётся в App.js, передаётся в Context и потом меняется в singUp.jsx
  //на код, приходящий с сервера.
  const [userCode, setUserCode] = useState(null);
  const [userCreated, setUserCreated] = useState(false);

  const checkCode = async (event) =>{
    event.preventDefault();
    console.log("codes", code, userCode);
    if( code === userCode){
      try{
        console.log("on react, creating user...");
        let response = await request("POST", "/user/create", JSON.stringify(userData));
        console.log("response", response)
        if(response.ok){
          setUserCreated(true);
        }
      } catch(error){
        console.log("error", error);
      }
      setVerified(true);
    } else {
        console.log("false password");
    }
  }

  const changeUserCode = (event) => {
    setUserCode(event.target.value);
  }

  return (
    <>
      <section className="signed mainSection">
        <form className="signed__form mainForm">
          <input
              onChange={changeUserCode}
            className="signed__input main_input"
            type="text"
            name="validationCode"
            placeholder="enter the code we sent you"
          />
          <button onClick={checkCode} className="signed__input signed__input--button main_button" type="submit">
            andalé
          </button>
        </form>
      </section>
    </>
  );
};

export default ValidateSignUp;