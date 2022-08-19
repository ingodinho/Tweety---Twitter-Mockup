import {Outlet, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import {useEffect} from "react";

const Redirect = () => {
    const userData = useRecoilValue(loggedInUser);
    const navigator = useNavigate();

    useEffect(()=> {
    if(userData?.accessToken) {
        navigator('/home');
    }},[userData]);

    return <Outlet/>
}

export default Redirect;