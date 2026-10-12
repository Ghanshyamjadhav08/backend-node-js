// required ('dotenv').config({path:'./env})

import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');


import app from './app.js';
import dotenv from 'dotenv';
import connectDB from "./db/index.js";

// Fix: Configure dotenv before calling connectDB()
dotenv.config({
    path: './.env' // Fix: Correct path to .env file
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port:${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Mongo db connection failed !!", err);
})