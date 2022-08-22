import BottomNav from "./BottomNav";
import {Outlet, useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import {useEffect, useState} from "react";
import SlideIn from "../SlideIn/SlideIn";
import {apiLink} from "../../utils/apiLink";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";

const AuthAndNav = () => {

    const navigator = useNavigate();
    const [userData,setUserData] = useRecoilState(loggedInUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // if (userData) {
        //     setIsLoading(false);
        //     return;
        // }

        const doSilentRefreshToken = async () => {
            const response = await axios.post(apiLink + '/users/refreshtoken',{},{
                withCredentials: true
            })
            setUserData(response.data);
            // const currentLocalUserData = JSON.parse(localStorage.getItem('userdata'));
            // localStorage.setItem('userdata', {...currentLocalUserData, accessToken: response.data.accessToken});
            const NINE_MINUTES = 9 * 60 * 1000;
            const timeoutId = setTimeout(() => {
                doSilentRefreshToken();
                clearTimeout(timeoutId)
            }, NINE_MINUTES);
            setIsLoading(false);
        }

        doSilentRefreshToken();
    }, [])

    if(isLoading) {
        return <LoadingPage/>
    }
    if(!userData.accessToken) {
        navigator('/login');
    }

    return (<>
        <SlideIn/>
        <Outlet/>
        <BottomNav/>
    </>)
}

export default AuthAndNav;