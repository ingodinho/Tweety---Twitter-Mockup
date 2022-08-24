import {Outlet, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import {useEffect} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";

const Redirect = () => {
    const userData = useRecoilValue(loggedInUser);
    const navigator = useNavigate();

    useEffect(() => {
        // if(!userData) return;
        const doSilentRefreshToken = async () => {
            try {
                const response = await axios.post(apiLink + '/users/refreshtoken', {}, {
                    withCredentials: true
                });
                if (response.data.accessToken) {
                    navigator('/home');
                }
            } catch (err) {
                return;
            }
        }
        doSilentRefreshToken();
    }, []);

    return <Outlet/>
}

export default Redirect;