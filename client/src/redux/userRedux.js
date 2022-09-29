import { createSlice } from "@reduxjs/toolkit"; // imported slice from Redux

const userSlice = createSlice({ // creating our first user slice
  name: "user",
  initialState: {
    currentUser : null,
    isFetching : false,
    error : false
  },
  reducers: {
    loginStart:(state)=>{
      state.isFetching=true;
    },
    loginSuccess:(state, action)=>{ 
      state.isFetching=false // if login is successful then, state.fetching will be false
      state.currentUser=action.payload
    }, // It's gonna be an assync function, we are gonna make api request and if it is successfull, we're gonna take action and we are gonna update our current user
    loginFailure:(state)=>{ // if our username or pass is wrong or if there is something wrong with api
      state.isFetching=false;
      state.error=true;

    }   ,
    logout: (state) => {
      state.isFetching = false ;
      state.currentUser = null ;
      state.error = null ;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure , logout } = userSlice.actions;
export default userSlice.reducer;