import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    first_name: {
        type: 'String',
    },
    other_names: {
        type: 'String',
        required: true
        },
    house_name:{
        type: 'String',
        required: true 
    },
    description: {
        type: 'String',
        required: true
    },
    location: {
        type: 'String',
        required: true
    },
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

