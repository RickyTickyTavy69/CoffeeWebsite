import pkg from "mongoose";
const {Schema, model} = pkg;

const orderSchema = new Schema({
    items : [
        {
            item: {
                type: Object,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});






export default model('Order', orderSchema);

