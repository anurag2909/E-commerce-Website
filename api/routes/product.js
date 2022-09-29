// we will be using express router

const router = require("express").Router();
const Product = require("../models/Product");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

// CREATE

router.post("/", verifyTokenAndAdmin, async (req,res) =>{ // Here only admin can create any product
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err){
        res.status(500).json(err)
    }
});

// UPDATE 

router.put("/:id", verifyTokenAndAdmin, async (req,res) =>{
        try{
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body // basically take everything inside the body and set it again.
            }, {new: true}
            );
            res.status(200).json(updatedProduct);
        } catch(err){
            res.status(500).json(err);
        }
})

// DELETE 

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET PRODUCT

router.get("/find/:id", async (req, res) => { // everyone can get the data, everybody can see products 
  try {
    const product = await Product.findById(req.params.id); // It will send all the details of the product
    res.status(200).json(product); // It will just send the required product
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS

router.get("/", async (req, res) => { // everbody can get all the product details 
    const qNew = req.query.new;
    const qCategory = req.query.category; // basically we can fetch all products by their creation date and also by the category
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1); // we are sorting the products wrt their creation date and showing above 5 products 
          } else if (qCategory) {
            products = await Product.find({
              categories: {
                $in: [qCategory], // if the given category is inside our available category
              },
            });
          } else {
            products = await Product.find();
          }
      
          res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router //To use this router, we should export this

