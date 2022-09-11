import about from "../assets/images/about-img.jpeg";
import menu1 from "../assets/images/menu-1.png";
import menu2 from "../assets/images/menu-2.png";
import menu3 from "../assets/images/menu-3.png";
import menu4 from "../assets/images/menu-4.png";
import menu5 from "../assets/images/menu-5.png";
import menu6 from "../assets/images/menu-6.png";

import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-3.png";
import quote from "../assets/images/quote-img.png";

import pic1 from "../assets/images/pic-1.png";
import pic2 from "../assets/images/pic-2.png";
import pic3 from "../assets/images/pic-3.png";

import blog1 from "../assets/images/blog-1.jpeg";
import blog2 from "../assets/images/blog-2.jpeg";
import blog3 from "../assets/images/blog-3.jpeg";

import useRequest from "../hooks/http.hook";
import {useState} from "react";

import NotAuthorizedWindow from "../components/notAuthorizedWindow/notAuthorizedWindow";

const Home = () => {
  const request = useRequest();
  const [notAuthorized, setNotAuthorized] = useState(false);


  const addProductToCard = async (e) => {
    const product = e.target.value;
    const username = JSON.parse(localStorage.getItem("username"));
    const productJson = JSON.stringify({productInfo : product, username: username});

    try{
      const jwtJson = await localStorage.getItem("jwtToken");
      const jwt = JSON.parse(jwtJson);
      console.log("productJson", productJson);
      const headers = jwt? {"Content-Type": "application/json", Authorization: `Bearer ${jwt} `}: {"Content-Type": "application/json"};
      const response = await request("POST", "/user/addToCard",  productJson, headers);
      const data = await response.json();
      console.log(data.message)
      if (data.message === "not authorized"){
          console.log("true");
          setNotAuthorized(true);
      }
      if(data.accessToken){
        await localStorage.setItem("jwtToken", JSON.stringify(data.accessToken));
      }
    } catch(error) {
      console.log("error adding to card" , error);
    }
  }

  return (
    <div>
      <section className="home" id="home">
        <div className="content">
          <h3>fresh coffee in the morning</h3>
          <p>
            our fresh coffee gonna wake u up leigge good smash in the face,
            motherf***er! it's like dope but legal
          </p>
          <a href="!#" className="btn">
            get your dose now
          </a>
        </div>
      </section>

      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span> us
        </h1>

        <div className="row">
          <div className="image">
            <img src={about} alt="" />
          </div>

          <div className="content">
            <h3>what makes our coffee special?</h3>
            <p>
              Our coffee pushes your feelings and gets you into a great feeling
              of strongness and extasy. You can work all night and day and never
              get tired, if you drink enough of our coffee.
            </p>
            <p>Even your code works the first time you try.</p>
            <a href="!#" className="btn">
              learn more
            </a>
          </div>
        </div>
      </section>

      <section className="menu" id="menu">
        <h1 className="heading">
          our <span>menu</span>
        </h1>
        {notAuthorized && <NotAuthorizedWindow/>} {/* wenn der benutzer nich auth. ist, aber etwas hinzufügen will, dann wird dieser Tag angezeigt.*/}
        <div className="box-container">
          <div className="box">
            <img src={menu1} alt="" />
            <h3>Latte Macchiato</h3>
            <div className="price">
              $2.90 <span>$3.90</span>
            </div>
            <button value={"Latte Macchiato , 2.9"} onClick={ (e) => addProductToCard(e)} className="btn">
              add to cart
            </button>
          </div>

          <div className="box">
            <img src={menu2} alt="" />
            <h3>Espresso Macchiato</h3>
            <div className="price">
              $2.90 <span>$3.90</span>{" "}
            </div>
            <button value={"Espresso Macchiato , 3.9"} className="btn">
              add to cart
            </button>
          </div>

          <div className="box">
            <img src={menu3} alt="" />
            <h3>Espresso</h3>
            <div className="price">
              $1.90 <span>$2.50</span>{" "}
            </div>
            <button value={"Espresso , 2.5"} className="btn">
              add to cart
            </button>
          </div>

          <div className="box">
            <img src={menu4} alt="" />
            <h3>Cappuccino</h3>
            <div className="price">
              $3.00 <span>$4.00</span>{" "}
            </div>
            <button value={" Cappuccino , 4"} className="btn">
              add to cart
            </button>
          </div>

          <div className="box">
            <img src={menu5} alt="" />
            <h3>Café con leche</h3>
            <div className="price">
              $1.90 <span>$2.50</span>{" "}
            </div>
            <button value={"Café con leche , 2.5"} className="btn">
              add to cart
            </button>
          </div>

          <div className="box">
            <img src={menu6} alt="" />
            <h3>Caffee Coretto</h3>
            <div className="price">
              $3.00 <span>$3.50</span>{" "}
            </div>
            <button value={"Caffee Coretto , 3.5"} className="btn">
              add to cart
            </button>
          </div>
        </div>
      </section>

      <section className="products" id="products">
        <h1 className="heading">
          our <span>products</span>
        </h1>

        <div className="box-container">
          <div className="box">
            <div className="icons">
              <a href="!#" className="fas fa-shopping-cart"></a>
              <a href="!#" className="fas fa-heart"></a>
              <a href="!#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={product1} alt="" />
            </div>
            <div className="content">
              <h3>fresh coffee</h3>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <div className="price">
                $15.99 <span>$20.99</span>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="icons">
              <a href="!#" className="fas fa-shopping-cart"></a>
              <a href="!#" className="fas fa-heart"></a>
              <a href="!#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={product2} alt="" />
            </div>
            <div className="content">
              <h3>fresh coffee</h3>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <div className="price">
                $15.99 <span>$20.99</span>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="icons">
              <a href="!#" className="fas fa-shopping-cart"></a>
              <a href="!#" className="fas fa-heart"></a>
              <a href="!#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={product3} alt="" />
            </div>
            <div className="content">
              <h3>fresh coffee</h3>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <div className="price">
                $15.99 <span>$20.99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="review" id="review">
        <h1 className="heading">
          customer's <span>review</span>
        </h1>

        <div className="box-container">
          <div className="box">
            <img src={quote} alt="" className="quote" />
            <p className="box_paragraph">
              Really good coffe, it makes me so strong and wakes me up so fast
            </p>
            <img src={pic1} className="user" alt="" />
            <h3>john deo</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>

          <div className="box">
            <img src={quote} alt="" className="quote" />
            <p className="box_paragraph">
              Really good coffe, it makes me so strong and wakes me up so fast
            </p>
            <img src={pic2} className="user" alt="" />
            <h3>john deo</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>

          <div className="box">
            <img src={quote} alt="" className="quote" />
            <p className="box_paragraph">
              Really good coffe, it makes me so strong and wakes me up so fast
            </p>
            <img src={pic3} className="user" alt="" />
            <h3>john deo</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h1 className="heading">
          <span>contact</span> us
        </h1>

        <div className="row">
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.6696116098233!2d6.77676012665462!3d51.224938188284135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8ca187e2fdd19%3A0x2ea2e040bfbfe1a!2sHeinrich-Heine-Allee%2C%2040213%20D%C3%BCsseldorf!5e0!3m2!1sde!2sde!4v1638155745723!5m2!1sde!2sde"
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          <form action="">
            <h3>get in touch</h3>
            <div className="inputBox">
              <span className="fas fa-user"></span>
              <input type="text" placeholder="name" />
            </div>
            <div className="inputBox">
              <span className="fas fa-envelope"></span>
              <input type="email" placeholder="email" />
            </div>
            <div className="inputBox">
              <span className="fas fa-phone"></span>
              <input type="number" placeholder="number" />
            </div>
            <input type="submit" value="contact now" className="btn" />
          </form>
        </div>
      </section>

      <section className="blogs" id="blogs">
        <h1 className="heading">
          our <span>blogs</span>
        </h1>

        <div className="box-container">
          <div className="box">
            <div className="image">
              <img src={blog1} alt="" />
            </div>
            <div className="content">
              <a href="!#" className="title">
                tasty and refreshing coffee
              </a>
              <span>by admin / 21st may, 2021</span>
              <p>
                Why is our coffee so tasty and refreshing? It seems like we
                would have put something inside which we have kept secret to
                you? Well, we would not tell you the recepie and all the
                ingredients which we have used. We can ashure you, though, there
                is nothing inside which is illegal or could be unhealthy for
                you. So, do not have doubts! Come in and enjoy...
              </p>
              <a href="!#" className="btn">
                read more
              </a>
            </div>
          </div>

          <div className="box">
            <div className="image">
              <img src={blog2} alt="" />
            </div>
            <div className="content">
              <a href="!#" className="title">
                tasty and refreshing coffee
              </a>
              <span>by admin / 21st may, 2021</span>
              <p>
                Why is our coffee so tasty and refreshing? It seems like we
                would have put something inside which we have kept secret to
                you? Well, we would not tell you the recepie and all the
                ingredients which we have used. We can ashure you, though, there
                is nothing inside which is illegal or could be unhealthy for
                you. So, do not have doubts! Come in and enjoy...
              </p>
              <a href="!#" className="btn">
                read more
              </a>
            </div>
          </div>

          <div className="box">
            <div className="image">
              <img src={blog3} alt="" />
            </div>
            <div className="content">
              <a href="!#" className="title">
                tasty and refreshing coffee
              </a>
              <span>by admin / 21st may, 2021</span>
              <p>
                Why is our coffee so tasty and refreshing? It seems like we
                would have put something inside which we have kept secret to
                you? Well, we would not tell you the recepie and all the
                ingredients which we have used. We can ashure you, though, there
                is nothing inside which is illegal or could be unhealthy for
                you. So, do not have doubts! Come in and enjoy...
              </p>
              <a href="!#" className="btn">
                read more
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
