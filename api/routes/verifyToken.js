const jwt = require("jsonwebtoken"); // imported jwt

// How we gonna verify our token

const verifyToken = (req,res,next) =>{ // we have basically used middleware here 
    const authHeader = req.headers.token
    console.log('Before authHeader =', authHeader)
    if (authHeader){ // if we have token, we just have to verify our token
         const token = authHeader.split(" ")[1]; // the 2nd element will be our token. bearer.....(2nd element)
        

         console.log('Before verifying token, token =', token)
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if (err) return res.status(403).json("Token is not valid!");
            req.user = user;
            console.log('New User', req.user)
            next(); // work is now completed 
        });

    } else{
        return res.status(401).json("You are not authenticated!");
    }
};  

const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,() =>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
            return res.status(403).json("You are not allowed to do that!");
        }
    });
};

// if for product, only admin can add any product then for this we have to create some other function

const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res,() =>{
        if (req.user.isAdmin){
            next(); // if user is admin, we gonna continue our parent funtion
        } else{
            return res.status(403).json("You are not allowed to do that!");
        }
    });
};

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};