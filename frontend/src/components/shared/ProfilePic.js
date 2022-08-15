import styled from "styled-components";
import {useRecoilValue} from "recoil";

const ProfilePic = () => {
    return <Picture
        src={'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'}
        alt={"Profile Picture"}/>
}

const Picture = styled.img`
    width: 50px;
`

export default ProfilePic;