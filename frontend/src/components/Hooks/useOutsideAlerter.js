import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {slideInMenu} from "../utils/SharedStates";

const useOutsideAlerter = (ref) => {
    const setShowMenu = useSetRecoilState(slideInMenu)
    useEffect(() => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }

    }, [ref])
}

export default useOutsideAlerter;