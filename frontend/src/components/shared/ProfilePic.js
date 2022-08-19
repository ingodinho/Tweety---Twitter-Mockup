import styled from "styled-components";
import placeHolderUrl from '../../img/profileplaceholder.png';
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../utils/SharedStates";
import {useNavigate} from "react-router-dom";

const ProfilePic = ({size}) => {

    const navigator = useNavigate();
    const userData = useRecoilValue(loggedInUser);

    const imgSize =
        size === 'big' ? '55px'
            : size === 'medium' ? '37px'
                : '32px'

    return <Picture
        onClick={()=> navigator(`/profile/${userData._id}`)}
        imgSize={imgSize}
        src={placeHolderUrl}
        alt={"Profile Picture"}/>
}

const Picture = styled.img`
  width: ${props => props.imgSize};
  height: ${props => props.imgSize};
  border-radius: 50%;
`

export default ProfilePic;