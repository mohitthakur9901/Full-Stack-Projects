
import MyButton from './Button'
import { FcGoogle } from "react-icons/fc";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0 = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <MyButton
            type="button"
            size="md"
            children={<FcGoogle className='h-12 w-12' />}
            className="w-full md:w-3/4 rounded-md py-3 px-4 mt-2"
            onClick={() => loginWithRedirect()}
        />
    )
}

export default Auth0