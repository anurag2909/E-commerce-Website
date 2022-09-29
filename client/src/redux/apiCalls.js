import { loginFailure, loginStart, loginSuccess , logout } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { updateCart } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user); // we just sent our login requests
    dispatch(loginSuccess(res.data)); // if above condition is successful we gonna dispatch res.data which is actually user date (our name, email, image or somethibg else)
  } catch (err) {
    dispatch(loginFailure()); // if there is a failure, we are gonna loginfailure action
  } 
};

export const signOut = async (dispatch) => {
  dispatch(logout()) ;
  
}