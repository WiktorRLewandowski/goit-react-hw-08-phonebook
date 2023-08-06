import SignIn from "mui/SignIn"
import { Helmet } from "react-helmet-async"

const Login = () => {
    return (
        <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <SignIn/>
        </>
    )
}

export default Login