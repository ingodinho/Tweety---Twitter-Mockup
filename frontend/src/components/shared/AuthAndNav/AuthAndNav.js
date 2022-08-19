import BottomNav from "./BottomNav";
import {Outlet, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import {useEffect} from "react";

const AuthAndNav = () => {
    const navigator = useNavigate();
    const userData = useRecoilValue(loggedInUser);
    useEffect(() => {
        if (!userData) {
            navigator('/');
        }
    }, [])

    return (<>
        <Outlet/>
        <BottomNav/>
    </>)
}

export default AuthAndNav;