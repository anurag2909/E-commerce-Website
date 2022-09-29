// we will be using express router

const router = require("express").Router();
const Cart = require("../models/Cart");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

// CREATE

router.post("/", verifyToken, async (req,res) =>{ // basically any user can create its own cart
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch(err){
        res.status(500).json(err)
    }
});

// UPDATE 

router.put("/:id", verifyTokenAndAuthorization, async (req,res) =>{ // user can change its own cart
        try{
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body // basically take everything inside the body and set it again.
            }, {new: true}
            );
            res.status(200).json(updatedCart);
        } catch(err){
            res.status(500).json(err);
        }
})

// DELETE 

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET USER CART

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => { // everyone can get the data, everybody can see products 
  try {
    const cart = await Cart.findOne({userId: req.params.userId}); // It will send all the details of the product
    res.status(200).json(cart); // It will just send the required product
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => { // only admin can see the data, beacause we are gonna see all carts of all the users
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router //To use this router, we should export this

