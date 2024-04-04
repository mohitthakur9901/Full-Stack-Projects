import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "../redux/User/user";
import AppBar from "../components/AppBar";

const Home = () => {
    const { user} = useAuth0();
    const dispatch = useDispatch()

    useEffect(() => {
        const createUserFromGoogleLogin = async () => {
            if (user){
                const response = await axios.post('api/auth/google' ,{
                    username: user.nickname,
                    email: user.email,
                })
                if (response.status === 200){
                    dispatch(setUser(response.data.data))
                }
            }
        }
        createUserFromGoogleLogin()
    }, [user])


    return (
        <div>
            <AppBar />
        </div>
    )
}

export default Home