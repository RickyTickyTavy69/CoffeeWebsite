import {Router} from "express";
let router = Router();

//import Menu from "../models/menumodel.js"

router.delete('/delete/:id', async (req, res) => {

    await req.user.removeFromCart(req.params.id);
    
    let cardObj = await req.user.cart.items;

    res.json(cardObj);
})



/*router.get('/save/:type', async (req, res) => {

    

    let type = req.params.type;

    let menuArray = await Menu.find();
    let menuItems = menuArray[0].items;

    let offer = menuItems.find( (item) => {
    return String(item.type) === String(type);
    })
      
    await req.user.addToCart( offer );
    res.redirect('/');
            
        
})*/

    
        
   

        
        
        
        
        
                                   
                     
    
    


export default router;