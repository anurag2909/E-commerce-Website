// Creating our Express Server

const express = require("express");
const app = express();
const mongoose = require("mongoose"); // for connecting Database
const dotenv = require ("dotenv");
const userRoute = require ("./routes/user"); // imported the routes
const authRoute = require ("./routes/auth"); // imported the routes
const cartRoute = require ("./routes/cart"); // imported the routes
const orderRoute = require ("./routes/order"); // imported the routes
const productRoute = require ("./routes/product"); // imported the routes
// const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();


// Anyone with our DB url can reach our database, so to prevent this we form .env file

mongoose
  .connect(process.env.MONGO_URL) // used dotenv for our db privacy
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// app.get("/api/test", () =>{ // whenever someone makes a get request on this (/api/test) endpoint, write test is succesful. 
//   console.log("Test is successful!");  // its not a good idea to write here all our endpounts, so we will create a new file names routes
// })

// using routing method
app.use(cors())
app.use(express.json()); // to use json in postman, we can pass any json file
app.use("/api/auth", authRoute); //  when we will go to /api/auth our appl. will use authRoutes.
app.use("/api/users", userRoute); //  when we will go to /api/user our appl. will use userRoutes.
app.use("/api/products", productRoute); //  when we will go to /api/products our appl. will use userRoutes.
app.use("/api/carts", cartRoute); //  when we will go to /api/carts our appl. will use userRoutes.
app.use("/api/orders", orderRoute); // when we will go to /api/orders our appl. will use userRoutes.
//  when we will go to /api/user our appl. will use userRoutes.
// app.use("/api/checkout", stripeRoute);




app.listen(process.env.PORT || 5000, ()=>{ // If there is no port no inside our .env file, use 5000 prt no (|| has been used for this task)
    console.log("Backend server is running");
})
