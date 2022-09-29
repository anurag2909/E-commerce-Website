import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/LogOut";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";


const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <Router>
      <Routes>

      {/* first route will be our home page, which is "/" */}
        <Route path="/" element={<Home/>}/>

        {/* second route will be our procuctlist page, which is "/products", :category shows parameters*/}
        <Route path="/products/:category" element={<ProductList/>}/>

        {/* third route will be our single product page, which is "/product", :id shows specific product*/}
        <Route path="/product/:id" element={<Product/>}/>

        <Route path="/cart" element={<Cart/>}/>

        {/* if there is a user already logged in before, we want him to direct into homepage*/}
        <Route path="/login" element={user? <Navigate to="/" /> : <Login />}/>

        <Route path="/logout" element={<Logout></Logout>}/>

        <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>}/>

      </Routes>
    </Router>
  );
};

export default App;