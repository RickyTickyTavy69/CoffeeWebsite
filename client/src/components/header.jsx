import logo from "../assets/images/logo.png";
import useRequest from "../hooks/http.hook";
import {useState} from "react";
import {Redirect, NavLink} from "react-router-dom";

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
        <NavLink to="/" className="logo">
          <img src={logo} alt="" />
        </NavLink>
        <NavLink className="nav-item" to="/">
          home
        </NavLink>
        <NavLink className="nav-item" to="#about">
          about
        </NavLink>
        <NavLink className="nav-item" to="#menu">
          menu
        </NavLink>
        <NavLink className="nav-item" to="#products">
          products
        </NavLink>
        <NavLink className="nav-item" to="#review">
          review
        </NavLink>
        <NavLink className="nav-item" to="#contact">
          contact
        </NavLink>
        <NavLink className="nav-item" to="/showCard">
          your card
        </NavLink>
      </nav>



      <nav className="navbar loginbar">
        {redirectToCard && <Redirect to="/card" />}
        {!username && <nav>                        {/*falls es loginUserData nicht gibt wird die Option zum LogIn angezeigt*/}
          <NavLink className="login" to="/logIn/logIn">
            login
          </NavLink>
          <NavLink className="login signUp" to="/signUp">
            sign up
          </NavLink>
        </nav>}
        {username && <nav>                         {/* falls es loginUserData nicht gibt wird die Option zum LogOut angezeigt*/}
          {/*<a className="login" href="/logIn/logIn">
            logOut
          </a>*/}
          <button onClick={logout}  className="login"> logOut </button>
          <NavLink className="nav-item" to="/signUp">
            You are logged in, {username};
          </NavLink>
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
