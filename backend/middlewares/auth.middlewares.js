const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Middlewares to protect routes
const protect = async(req,res,next) => {
    try{
        let token = req.headers.authorization;
        if(token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]; //Extract Token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        else{
            res.status(401).json({message:"Not Authorized, no token"});
        }
    }
    catch(error){
        res.status(401).json({message: "Token Failed", error: error.message});
    }
};

//Middlewares for admin-only access
const adminOnly = (req,res,next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(403).json({message: "Access Denied, Admin Only Access"})
    }
};

module.exports = {protect,adminOnly};