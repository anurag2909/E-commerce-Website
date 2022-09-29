import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { signOut } from '../redux/apiCalls';
import { updateCart } from '../redux/cartRedux';

function LogOut() {
    const user = useSelector(state=>state.user) ;
    const dispatch = useDispatch() ;
    const handler = (event) => {
        event.preventDefault() ;
        localStorage.clear()
        signOut(dispatch) ;
        dispatch(updateCart({ products: [], quantity: 0, total: 0}))
    }
  return (
    <div>
      <Button onClick={(event) => handler(event)}><Link to='/login'>LOG OUT</Link></Button>
    </div>
  )
}

export default LogOut
