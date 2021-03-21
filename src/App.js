import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Transactions from './components/transactions/Transactions'
import { loadUser } from './store/actions/authActions'

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route path='/login' component={ Login } />
        <Route path='/register' component={ Register } />
        <Route path='/' component={ Transactions } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
