import styled from "styled-components";
import placeHolderUrl from '../../img/profileplaceholder.jpeg';
import {useRecoilValue} from "recoil";

const ProfilePic = ({size}) => {
    let imgSize;
    if(size === 'big') imgSize="55px";
    else if (size === 'medium') imgSize="37px";
    else if (size === 'small') imgSize="32px";
    else imgSize = "55px";

    return <Picture
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