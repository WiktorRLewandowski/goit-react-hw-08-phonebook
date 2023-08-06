import PropTypes from 'prop-types'
import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "redux/operations";
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks';

import { Route, Routes } from 'react-router-dom';

import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { Loader } from './Loader';

import Navigation from './Navigation/Navigation'

const HomePage = lazy(()=> import('../pages/Home'))
const LoginPage = lazy(()=> import('../pages/Login'))
const RegisterPage = lazy(()=> import('../pages/Register'))
const ContactsPage = lazy(()=> import('../pages/Contacts'))

export default function App() {
  const dispatch = useDispatch()
  const { isRefreshing } = useAuth()

  useEffect(()=> {
    dispatch(refreshUser());
    dispatch(fetchContacts());
  }, [dispatch])

  return isRefreshing ? (<Loader/>) : (
    <>
        <Routes>
          <Route path='/' element={<Navigation/>}>
            <Route index element={<HomePage/>} />
            <Route 
              path='/login' 
              element={
                <RestrictedRoute redirectTo='/contacts' component = {<LoginPage/>} />
              } />
            <Route
               path='/register' 
               element={
                 <RestrictedRoute redirectTo='/contacts' component = {<RegisterPage/>}/>
               } />
            <Route 
              path='/contacts' 
              element={
                <PrivateRoute redirectTo='/login' component = {<ContactsPage/>} /> 
              }/>
          </Route>
        </Routes>
    </>
  )
}

App.propTypes = {
  user: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string
}