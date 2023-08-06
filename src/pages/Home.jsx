// import { Loader } from "components"
// import { ContactList } from "components/ContactList"
// import { ContactForm } from "components/ContactsForm"
// import { useSelector } from "react-redux"
// import { selectIsLoading } from "redux/selectors"
// import { Filter } from "components/Filter"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import jesusDesu from '../jesusdesu1.png'
import { useAuth } from "hooks"

const Home = () => {
    // const isLoading = useSelector(selectIsLoading)
    const {isLogged} = useAuth()
    return (
        <>
            <Helmet>
                <title>
                    Welcome to Phonebook App!
                </title>
            </Helmet>
            <div className="main">
            {!isLogged && <h1>Hello kind stranger, would you like to <Link className="login">register</Link>? <Link className='login' path='/login'>Login</Link></h1>}
            <img className="image" src={jesusDesu} alt="Yeah, that's it."/>
            </div>
            {/* <ContactForm/>
            <Filter/>
            {!isLoading 
                ? <ContactList/> 
                : <Loader/>} */}
        </>
    )
}

export default Home