import styled from "styled-components";
import placeHolderUrl from "../../img/profileplaceholder.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  loggedInUser,
  slideInMenu,
  userProfilePic,
} from "../utils/SharedStates";
import { useNavigate } from "react-router-dom";

const ProfilePic = ({ size, src, nolink, active }) => {
  const setShowSlideIn = useSetRecoilState(slideInMenu);
  const navigator = useNavigate();
  const userData = useRecoilValue(loggedInUser);

  const imgSize = size === "big" ? "55px" : size === "medium" ? "37px" : "32px";

  return (
    <Picture
      onClick={() => nolink ? '' : setShowSlideIn((prev) => !prev)}
      imgSize={imgSize}
      src={src || placeHolderUrl}
      alt={"Profile Picture"}
      active={active}
    />
  );
};

const Picture = styled.img`
  width: ${(props) => props.imgSize};
  height: ${(props) => props.imgSize};
  border-radius: 50%;
  object-fit: cover;
  border: ${p => p.active && 'solid 3px var(--clr-blue)'};
`;

export default ProfilePic;
