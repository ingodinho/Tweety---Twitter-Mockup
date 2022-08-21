import styled from "styled-components";
import placeHolderUrl from '../../img/profileplaceholder.png';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {loggedInUser, slideInMenu, userProfilePic} from "../utils/SharedStates";
import {useNavigate} from "react-router-dom";

const ProfilePic = ({size, src}) => {

    const setShowSlideIn = useSetRecoilState(slideInMenu);
    const navigator = useNavigate();
    const userData = useRecoilValue(loggedInUser);

    const imgSize =
        size === 'big' ? '55px'
            : size === 'medium' ? '37px'
                : '32px'

    return <Picture
        onClick={()=> setShowSlideIn(prev => !prev)}
        imgSize={imgSize}
        src={src || placeHolderUrl}
        alt={"Profile Picture"}/>
}

const Picture = styled.img`
  width: ${props => props.imgSize};
  height: ${props => props.imgSize};
  border-radius: 50%;
`

export default ProfilePic;