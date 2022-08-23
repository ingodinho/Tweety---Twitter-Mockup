import styled from "styled-components";
import ProfilePic from "../../shared/ProfilePic";
import BirdLogoUrl from "../../../img/icons/Bird Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedInUser } from "../../utils/SharedStates";

const HomeHeader = ({ userProfilePicture }) => {
  const navigator = useNavigate();
  const setUserData = useSetRecoilState(loggedInUser);

  return (
    <HeaderWrapper>
      <IconBar>
        <ProfilePic size={"small"} src={userProfilePicture} />
        <Link to={"/home"}>
          <BirdLogo src={BirdLogoUrl} alt="Bird Logo" />
        </Link>
      </IconBar>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 2rem var(--spacing-wrapper) 0.5rem var(--spacing-wrapper);
  border-bottom: 1px solid var(--clr-line-grey);
`;

const IconBar = styled.div`
  display: flex;
  align-items: center;
`;

const BirdLogo = styled.img`
  margin-left: 37vw;
  width: 27px;
  height: 27px;
`;

export default HomeHeader;
