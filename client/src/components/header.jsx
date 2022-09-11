import logo from "../assets/images/logo.png";
import useRequest from "../hooks/http.hook";
import {useState} from "react";
import {Redirect} from "react-router-dom";

const Header = () => {
                          // нужен какой то useEffect или передать как параметр, а тут в хедере уже
                          // запихать в localStorage, иначе он только при перезагрузке страницы, видит
                          // что есть userLoginData
                          // убрать ссылку на you are logged in

                          // потом поработать над этим вместе с редирект.
  const username = JSON.parse(localStorage.getItem("username"));
  const request = useRequest();
  const [redirectToCard, setRedirectToCard] = useState(null);

  // токен, который я получаю в компоненте login.jsx, должен быть в headers, authorization.
  //const requestUserCard = async (name) => {
    //let data;
    //userLoginData && console.log("this is name", userLoginData.name);
    //userLoginData && (data = await request("POST", "/showCard", JSON.stringify(userLoginData.name)));
  //}

  const logout = async () => {
    const username = JSON.parse(localStorage.getItem("username"));
    localStorage.clear();
    const userJson = JSON.stringify({username});
    await request("POST", "/user/logout", userJson, {"Content-Type": "application/json"});
  }

  return (
    <div className="header">
      <nav className="navbar navigation">
        <a href="/" className="logo">
          <img src={logo} alt="" />
        </a>
        <a className="nav-item" href="/">
          home
        </a>
        <a className="nav-item" href="#about">
          about
        </a>
        <a className="nav-item" href="#menu">
          menu
        </a>
        <a className="nav-item" href="#products">
          products
        </a>
        <a className="nav-item" href="#review">
          review
        </a>
        <a className="nav-item" href="#contact">
          contact
        </a>
        <a className="nav-item" href="/showCard">
          your card
        </a>
      </nav>



      <nav className="navbar loginbar">
        {redirectToCard && <Redirect to="/card" />}
        {!username && <nav>                        {/*falls es loginUserData nicht gibt wird die Option zum LogIn angezeigt*/}
          <a className="login" href="/logIn/logIn">
            login
          </a>
          <a className="login signUp" href="/signUp">
            sign up
          </a>
        </nav>}
        {username && <nav>                         {/* falls es loginUserData nicht gibt wird die Option zum LogOut angezeigt*/}
          {/*<a className="login" href="/logIn/logIn">
            logOut
          </a>*/}
          <button onClick={logout}  className="login"> logOut </button>
          <a className="nav-item" href="/signUp">
            You are logged in, {username};
          </a>
        </nav>}
        <div className="icons">
          <div className="fas fa-search" id="search-btn"></div>
          <div onClick={() => setRedirectToCard(true)}  className="fas fa-shopping-cart" id="cart-btn"></div>
          <div className="fas fa-bars" id="menu-btn"></div>
        </div>
        <div className="search-form">
          <input type="search" id="search-box" placeholder="search here..." />
          <label htmlFor="search-box" className="fas fa-search"></label>
        </div>
        <div className="cart-container-toggle">
          <h1 className="title-messagee-toggle">
            Your card is still empty. Don't loose your chance today and order
            now our tasty and powerful coffee which wiil wake you up, even if
            you are dead
          </h1>
        </div>
      </nav>
    </div>
  );
};

export default Header;
