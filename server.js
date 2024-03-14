const app = require('./app');
const cloudinary = require('cloudinary');
const dotenv=require('dotenv');
const connectdatabase = require('./config/database');


process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log('shuting down the server due to uncaught promise rejection')

    process.exit(1);
})


dotenv.config({ path: 'config.env' });


// connectdatabase
connectdatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, (server) => {
    console.log(`server is listening on Port http://localhost:${process.env.PORT}`);
})


// unhandleerror catch ,comes from .env file
process.on('unhandledRejection', (err) => {
    console.log(`Error:${err.message}`);
    console.log('shuting down the server due to unhandled promise rejection')

    server.close(() => {
        process.exit(1);
    })
})