import mongoose from "mongoose";

require('dotenv').config();

const db_url: any = process.env.DATABASE_URL;

mongoose.connect(
    db_url,{
    {useNewUrlParser: true, 
    useUnifiedTopology: true}
    },
    () => {
        console.log("Connected Successfully to Database");
    }
);

module.exports = mongoose;