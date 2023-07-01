require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');


const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

/*
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
} */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/products', productRoute);

//routes
app.get('/', (req, res) => {
    res.send(`Hello node API`);
});

app.get('/blog', (req, res) => {
    res.send("Hello blog, my name is Mateus");
});

app.use(errorMiddleware);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('connected to MongoDB');
        app.listen(PORT, () => { console.log(`Node API app is running on port ${PORT}`) });
    }).catch((error) => {
        console.log(error);
    });