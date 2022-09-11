import pkg from "mongoose";
const {Schema, model} = pkg;

const offerSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


export default model('Offer', offerSchema);