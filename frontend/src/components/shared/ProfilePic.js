import styled from "styled-components";
import placeHolderUrl from '../../img/profileplaceholder.jpeg';
import {useRecoilValue} from "recoil";

const ProfilePic = () => {
    return <Picture
        src={placeHolderUrl}
        alt={"Profile Picture"}/>
}

const Picture = styled.img`
    width: 50px;
`

export default ProfilePic;