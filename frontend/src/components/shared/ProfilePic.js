import styled from "styled-components";
import placeHolderUrl from '../../img/profileplaceholder.jpeg';
import {useRecoilValue} from "recoil";

const ProfilePic = ({size}) => {

    const imgSize =
        size === 'big' ? '55px'
            : size === 'medium' ? '37px'
                : '32px'

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