/*import pkg from "mongoose";
const {Schema, model} = pkg

import Offer from "./offerModel.js";

const menuSchema = new Schema({
    items: [
        {
            type: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true
            }
        },
    ]
})

menuSchema.methods.addAllItems = function () {
    
   console.log('works');

    fs.readFile( path.join(__dirname, '..', 'data', 'products.json'),
    (error, data) => {
        if(error) {
            console.log('error!', error);
        } else{
            let products = Buffer.from(data).toString();
            let productsObj = JSON.parse(products);
            const items = [...this.items];

            productsObj.forEach( item => {
                let offer = new Offer({
                    type: item.type,
                    price: item.price,
                    image: item.image
                });
                
                items.push(offer);
            })
            this.items = items;
            return this.save();
        }
    })                                                   // этот метод читает файл products.json, обращается к модели order, которая возвращает order с _id от mongoDB.
}                                                   // и с помощью цикла создаёт объект для каждого item на основе модели order. Потом с помощью push добавляет его в
                                                        // массив items у Menu. Menu надо создать при запуске либо при вызове функции addAllItems. 





export default model('Menu', menuSchema);*/