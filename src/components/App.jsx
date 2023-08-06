import PropTypes from 'prop-types'

// import { ContactList } from "./ContactList";
// import { ContactForm } from "./ContactsForm";
// import { Filter } from "./Filter";
// import { Loader } from "./Loader"

import { fetchContacts } from "redux/operations";
// import {  
//   selectIsLoading, 
//   selectError 
//   } from "redux/selectors";

import { 
  useDispatch, 
  // useSelector 
  } from "react-redux";
import {  lazy, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
// import { UserMenu } from './UserMenu';
import Navigation from './Navigation/Navigation'

import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from 'hooks';
import { refreshUser } from 'redux/auth/operations';
import { Loader } from './Loader';

// import { Home, Register } from 'pages';
// import { Login } from 'pages';
// import { Contacts } from 'pages/Contacts';

const HomePage = lazy(()=> import('../pages/Home'))
const LoginPage = lazy(()=> import('../pages/Login'))
const RegisterPage = lazy(()=> import('../pages/Register'))
const ContactsPage = lazy(()=> import('../pages/Contacts'))


export default function App() {
  // const error = useSelector(selectError)
  // const isLoading = useSelector(selectIsLoading)
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


    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'column',
    //     fontSize: '1.5rem',
    //     color: '#010101'
    //   }}
    // >
    // <Helmet>
    //   <title>Phonebook app</title>
    // </Helmet>
    //   {error && <p> {error} </p> }
    //   <h2><span style={{color: 'indigo'}}>Phone</span>book</h2>
    //   <ContactForm/>
    //   <h3>Contacts</h3>
    //   <Filter/>
    //   {!isLoading 
    //     ? <ContactList/> 
    //     : <Loader/>}
    // </div>
  )
}

App.propTypes = {
  user: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string
}