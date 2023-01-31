// express
const express = require('express');
const app = express();

// cors
const cors = require('cors');

const corsOptions = {
    origin: ["http://localhost:5173/",],
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    prefLightContinue: false,
};

app.use(cors(corsOptions));

// dotenv
require('dotenv').config({ path : "./.env"});

// db connect
require("./config/database");

// json parsing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// routes
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

// server
PORT=process.env.PORT
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});