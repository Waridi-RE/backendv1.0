import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    imageURL: {
       type: 'String',
       required: true
    },
    public_id: {
        type: 'String',
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Image', ImageSchema);

