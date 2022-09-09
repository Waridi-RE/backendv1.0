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
    }

});

module.exports = mongoose.model('Market', MarketSchema);
