import styled from "styled-components";
import ProfilePic from "../../shared/ProfilePic";
import BirdLogoUrl from '../../../img/icons/Bird Logo.svg';
import FeatureIcon from '../../../img/icons/Feature stroke icon.svg';
import {Link} from "react-router-dom";

const HomeHeader = () => {
    return (
        <HeaderWrapper>
            <IconBar>
                <ProfilePic/>
                <Link to={'/home'}><BirdLogo src={BirdLogoUrl} alt="Bird Logo"/></Link>
                <img src={FeatureIcon} alt="Feature Icon"/>
            </IconBar>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
  padding: 2rem var(--spacing-wrapper);
`

const IconBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BirdLogo = styled.img`
  width: 27px;
  height: 27px;
`

export default HomeHeader;