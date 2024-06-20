import dotenv from 'dotenv';
import { app } from './app.js';
import express from 'express';
import connectToDatabase from './database/index.js';
dotenv.config();


(async function() {
    try {
        await connectToDatabase();
        app.listen(process.env.PORT,() => {
            console.log('listening on port' + process.env.PORT)
        });
        app.on("error",(error) => {
            console.log('error while connecting to the express' + error)
        })
    } catch (error) {
        console.log('mongo db connection failed' + error)
    }
})()