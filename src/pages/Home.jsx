import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import jesusDesu from '../jesusdesu1.png'
import { useAuth } from "hooks"

const Home = () => {
    const {isLogged} = useAuth()
    return (
        <>
            <Helmet>
                <title>
                    Welcome to Phonebook App!
                </title>
            </Helmet>
            <div className="main">
            {!isLogged && <h1>Hello kind stranger, would you like to <Link className="login">register</Link>? <Link className='login' path='/login'>Login</Link>...?</h1>}
            <img className="image" src={jesusDesu} alt="Yeah, that's it."/>
            </div>
        </>
    )
}

export default Home