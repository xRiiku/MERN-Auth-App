import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const initDB = () => {

    mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err)
})
} 

export default {initDB}