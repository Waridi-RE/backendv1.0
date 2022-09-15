import mongoose from "mongoose";

const MarketSchema = new  mongoose.Schema({
    marketImageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
});

export default mongoose.model('Market', MarketSchema);
