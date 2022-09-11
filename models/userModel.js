import pkg from "mongoose";
const { Schema, model } = pkg;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required: true
    },
    cart: {
        items: [
            {  
                type: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true,
                    default: 1
                },
            },
        ]
    },
    refreshToken: {
        type: String
    },
})

userSchema.methods.addToCart = function(order) {
    
    const items = [...this.cart.items];
    const idx = items.findIndex((item) => {
        return item.itemId.toString() === order._id.toString();
    });

    if (idx >= 0) {
        items[idx].amount += 1;
    } else {
        items.push({
            type: order.type,
            price: order.price,
            image: order.image,
            itemId : order._id,
            amount: 1
        });
    }
    

    this.cart = { items };
    return this.save();
}


userSchema.methods.removeFromCart = function(id) {
    let items = [...this.cart.items];
    const idx = items.findIndex((item) => {
        return item._id.toString() === id.toString();
    });

    if(items[idx].amount === 1) {
        items = items.filter( (item) => {
            return item._id.toString() !== id.toString(); 
        })
    } else {
        items[idx].amount -= 1;
    }

    this.cart = {items}
    return this.save()
}

userSchema.methods.clearCart = function() {
    this.cart = {items: []};
    return this.save();
}

export default model('User', userSchema);