// we will be using express router

const router = require("express").Router();
const User = require("../models/User");

// req => request what we are getting from user, user can provide name, sirname or can leave blank.
// res=> the response that we would be sending

// router.get("/usertest", (req,res) =>{
//     res.send("user test is successfull!");
// });

// lh:5000/api/users/usertest => when we'll go to this url, it will show user test is successfull!

// if you're using postmethod, it means you are gonna take req from user or client

// router.post("/userposttest", (req,res) =>{
//     const username = req.body.username; // eg. let's take username from our client side
//     console.log(username); // to test this we'll use postman
// })

// UPDATE 

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

router.put("/:id", verifyTokenAndAuthorization, async (req,res) =>{
    if (req.body.password){
        req.body.password = CryptoJS.arguments.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body // basically take everything inside the body and set it again.
            }, {new: true}
            );
            res.status(200).json(updatedUser);
        } catch(err){
            res.status(500).json(err);
        }
})

// DELETE 

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET USER

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // It will send all the details of the user, to prevent this we wil use below lines
    const { password, ...others } = user._doc;
    res.status(200).json(others); // ITt will just send others 
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router //To use this router, we should export this

