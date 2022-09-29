// we are gonna register and auth. in this route

const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// REGISTER

router.post("/register", async (req,res) =>{ // beacause, the user is goona send us the username, password and oyher infos.

    console.log('Inside register backend', req.body)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //password: req.body.password we use cryptojs to hash our password

        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
        ).toString() // we have stored password secret in our env file
    });

    // we should send these data into our DB. So,

    // new User.save()

    // we can't do this directly because its a promise which is a asynchoronus function. Like any doc, any update or anything takes couple of mins to save into our DB. It all depends over the server or internet speed. To prevent this, we use async function.

    try{
        const savedUser = await newUser.save();
        // console.log(savedUser); basically, it will wait until the saving process is completed and then it will print the console. if there is any sort of error, it will go to catch and print the err.
        res.status(201).json(savedUser);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

})

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// LOGIN

router.post("/login", async (req,res) =>{
    try{
        const user = await User.findOne({username: req.body.username});
        console
        if(!user)
            return res.status(401).json("Wrong Credentials!"); // if user entered wrong username then print these lines

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
        );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // const Originalpassword=user.password;
        if (Originalpassword!=req.body.password)
            return res.status(401).json("Wrong Credentials!");
        
        const { password, ...others} = user._doc; // we'll show every data to the user other than password

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC,
            {expiresIn: "3d"} // the access token will be expired in 3 days 
        );

        res.status(200).json({others, accessToken}) // if everything is correct then we are sending all information other than user's password
    } catch(err){
        res.status(500).json(err);
    }
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Through JSON web Token we're gonna verify our users, we're gonna provide them pages on web token after login process. So, whenever they try to make any request (updating or deleting any user or product or cart, we're just gonna verify if the user, cart or order belongs to client or not)





module.exports = router