import {Router} from "express";
const router = Router();
import Order from "../models/ordersModel.js";



router.get('/', async (req, res) => {
    try{
        let orders = await Order.find({ 'user.userId' : req.user._id })
        .populate('user.userId');
        
        orders = orders.map( order => {
            return {
                ...order._doc,
                price: order.items.reduce((total, c) => {
                    return total += c.amount * c.item.price;
                }, 0)
            }
        })

        console.log(orders);

        res.render('orders', {
            isOrder: true,
            title: 'Your Orders',
            orders    
        });
    } catch (error) {
        console.log(error);
    }
    
})


router.post('/', async (req, res) => {

    try{
        const user = await req.user;
        let cart = user.cart.items;

        let items = cart.map((item) => {
            return {
            amount: item.amount,
            item: item
            }
        });

        const order = new Order({
            user: {
            name: req.user.name,
            userId: req.user
            },
            items
        });

        await order.save();
        await req.user.clearCart();

    } catch(error){
        console.error('Ошибка в роуте orders', error);
    }
    

    res.redirect('/orders');
})






export default router;