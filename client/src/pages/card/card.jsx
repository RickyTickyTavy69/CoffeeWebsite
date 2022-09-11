import useRequest from "../../hooks/http.hook";
import {useState, useContext, useEffect} from "react";
import {Redirect} from "react-router-dom";
import Context from "../../context/auth.context.js";
import cardStyles from "./card.module.css";



const Card = () => {
    const {card, setCard} = useContext(Context);
    const request = useRequest();
    const [totalPrice, setTotalPrice] = useState(0);
    const [notAuthMessage, setNotAuthMessage] = useState(""); // wenn kein Benutzer angemeldet ist, dann (z. 41) wird notAuthMessage eingestellt
    
    const removeFromCard = async (productId) => {
        const username = JSON.parse(localStorage.getItem("username"));
        const jwtJson = localStorage.getItem("jwtToken");
        const jwt = JSON.parse(jwtJson);
        const productIdJson = JSON.stringify({productId, username});
        const headers = jwt? {"Content-Type": "application/json", Authorization: `Bearer ${jwt} `}: {"Content-Type": "application/json"};
        const response = await request("POST", "/user/removeFromCard", productIdJson, headers);
        const data = await response.json();
        if(data.accessToken){
            await localStorage.setItem("jwtToken", JSON.stringify(data.accessToken));
        }
        setCard(data.newCart);
    }

    useEffect(() =>{
        const cardRequest = async () => {
            try{
                const jwtJson = await localStorage.getItem("jwtToken");
                const jwt = JSON.parse(jwtJson);
                console.log("this is jwt", jwt);
                const username = JSON.parse(localStorage.getItem("username"));
                let usernameJson = JSON.stringify({username});
                const headers = jwt? {"Content-Type": "application/json", Authorization: `Bearer ${jwt} `}: {"Content-Type": "application/json"};
                const response = await request("POST", "/user/showCard", usernameJson, headers);
                const data = await response.json();
                console.log("@ cardRequest message", data.message);
                data.message === "not authorized" && setNotAuthMessage("you are not authorized! Sign Up to gain advantages as a registered User!");
                if(data.accessToken){
                    await localStorage.setItem("jwtToken", JSON.stringify(data.accessToken));
                }
                console.log("data cart", data.cart);
                if(data.cart){
                    setCard(data.cart);
                    let total = 0;
                    data.cart.forEach((product) => {
                        total = total + Number(product.price);
                    })
                    setTotalPrice(total);
                }
            }catch(error){
                console.log("Error requesting card", error);
            }
        }
        console.log("this is card state", card);
        cardRequest();
    }, []);




    return (
        <>
            {(!card || !card.length) &&
                <section className={cardStyles.card_container}>
                    <h1>This is your card with ordered items</h1>
                    <p>You card seem to be empty! Yo have not ordered nothing yet..</p>
                    <p>Check out our menu to find you favorite products! Enjoy!</p>
                    <p className={cardStyles.not_auth}>
                        {notAuthMessage}
                    </p>
                </section>
            }
            {
                (card && card.length) &&
                        <div className={cardStyles.card_container}>
                            <h1>This is your card with ordered items</h1>
                            <div className={cardStyles.table_head} >
                                <div>Item</div>
                                <div className={cardStyles.price}>Price</div>
                                <div>Amount</div>
                                <div>-------------</div>
                            </div>
                            <div className={cardStyles.items}>
                                {card.map((product) => {
                                    return(
                                    <div className={cardStyles.product_item} key={product._id}>
                                        <p>{product.type}</p>
                                        <p>{product.price + "0"} $</p>
                                        <p>{product.amount}</p>
                                        <button onClick={ () => removeFromCard(product._id)} className={cardStyles.delete}>delete</button>
                                    </div>);
                                })}
                            </div>
                            <div>-------------------------------------------------------------------------------------------------------------------------</div>
                            <div className={cardStyles.total_price}>
                                <div>Total Price</div>
                                <div className={cardStyles.total_price_number}>{totalPrice + "0"} $</div>
                            </div>

                        </div>
            }

            }
        </>
    );
};

export default Card;
