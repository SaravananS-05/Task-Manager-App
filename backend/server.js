dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const authRoutes = require('./routes/auth.routes');
//Middlewares to handle cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type","Authorization"]
    })
);

//Middlewares
app.use(express.json);

//Routes
app.use("api/auth",authRoutes);

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}) 
