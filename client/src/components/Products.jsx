import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,filters,sort}) => { // we have used three props here

// Now we gonna fetch our data
// firstly, I'm gonna create qstate and define my producs so,

const [products,setProducts] = useState([]) // at the beginnig it gonna be an empty array 

const [filteredProducts,setFilteredProducts] = useState([]) // whenever we change our filter, we are gonna update this filteredproducts and we will show by those filters

useEffect(()=>{
  const getProducts = async() =>{
    try{
      const res = await axios.get(cat ?`http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products"); // if there is no category applied, just fetch data from the second url
      setProducts(res.data);
    } catch(err){}
  };
  getProducts();
},[cat]); // here cat is our dependancy, means when cat changes just run this function. inside this function, we will put get and post requests, this will be done by axios

useEffect(() => { // for this, learn how to filter arrays and objects in Javascript  
  cat &&
    setFilteredProducts(
      products.filter((item) => 
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
}, [products, cat, filters]); // our dependancies just like above

useEffect(() => {
  if (sort === "newest") {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.createdAt - b.createdAt)
    ); // prev is a new array and (a,b) is our algo for sorting. if first one is greater, it's just gonna display the newest item
  } else if (sort === "asc") {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
    );
  } else {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
    );
  }
}, [sort]); // for sorting the dresses
    
return (
  <Container>
    {cat
      ? filteredProducts.map((item) => <Product item={item} key={item.id} />) // if there is a category, we will be seeing filtered products, else we wil only see only 8 items 
      : products.slice(0, 8).map((item) => <Product item={item} key={item.id} />)} 
  </Container>
);
 };

export default Products;