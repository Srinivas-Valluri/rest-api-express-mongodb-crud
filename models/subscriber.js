import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscriberToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: String,
        required: true,
        default: Date.now()
    }
})

const subscriberModel = mongoose.model('Subscriber', subscriberSchema);

export default subscriberModel;
