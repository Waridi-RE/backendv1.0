import mongoose from "mongoose";

require('dotenv').config();

const db_url: any = process.env.MONGO_URL;

mongoose.connect(
    db_url,
    {useNewUrlParser: true, 
    useUnifiedTopology: true},
    (error: any) => {
        if (!error) {
            console.log("Database Connected Successfully");
        } else {
            console.log("Error : " + error);
        }
    }
);

export default mongoose;