import { createSlice } from "@reduxjs/toolkit"; // imported slice from Redux

const cartSlice = createSlice({ // creating our first cart slice
  name: "cart",
  initialState: {
    products: [], // at the beginning, it's gonna be empty
    quantity: 0, // these all are initial conditions
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => { // state => previous state
      state.quantity += 1; // quantity is cart quantity number 
      state.products.push(action.payload); // payload is basically our new product, to understand this watch Redux video
      state.total += action.payload.price * action.payload.quantity; // quantity is new product quantity
    },
    updateCart: (state, action) =>{
      state.quantity = action.payload.quantity;
      state.products = action.payload.products;
      state.total = action.payload.total;
    },
  },
});

export const { addProduct, updateCart } = cartSlice.actions;
export default cartSlice.reducer;