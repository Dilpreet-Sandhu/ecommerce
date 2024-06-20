import mongoose from 'mongoose';


export default async function connectToDatabase() {
    try{
        await mongoose.connect(`${process.env.MONGOURI }/${process.env.DB_NAME || 'data'}`);


        console.log("\n database connected")
    }
    catch (error) {
        console.log('error while connecting to database ' + error)
    }
}