import {
  ContentWrapper,
  ImgContainer,
  NamesContainer,
  UserHeader,
  Wrapper,
} from "./UserCard.styling";
import ProfilePic from "../ProfilePic";
import { ButtonFollow } from "../../../styles/Buttons";
import { useEffect, useState } from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { loggedInUser, forceRerender } from "../../utils/SharedStates";
import { apiLink } from "../../utils/apiLink";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UserCard = (props) => {
  const userData = useRecoilValue(loggedInUser);
  const [following, setFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();
  const rerender = useSetRecoilState(forceRerender)

  const axiosOptions = {
    headers: {
      token: `JWT ` + userData.accessToken,
    },
  };

  useEffect(() => {
    if (!props.followedBy || !userData) return;
    setFollowing(props.followedBy.includes(userData.userId));
    setIsLoading(false);
  }, [props, userData]);

  const handleFollow = async () => {
    const data = {
      followUserId: props._id,
    };
    const response = await axios.put(
      apiLink + "/users/follow",
      data,
      axiosOptions
    );
    setFollowing((prev) => !prev);
    rerender(prev => prev + 1);
  };

  const toProfile = e => {
    e.preventDefault();
    navigator(`/profile/${props._id}`)
  }

  if (isLoading) {
    return <div>test</div>;
  } else {
    return (
      <Wrapper>
        <ImgContainer>
          <ProfilePic src={props.profilePictureLink} size={"medium"} />
        </ImgContainer>
        <ContentWrapper>
          <UserHeader>
            <NamesContainer onClick={toProfile}>
              <h4>
                {props.firstName} {props.lastName}
              </h4>
              <span>@{props.username}</span>
            </NamesContainer>
            {userData.userId !== props._id && (
              <ButtonFollow following={following} onClick={handleFollow}>
                {following ? "Following" : "Follow"}
              </ButtonFollow>
            )}
          </UserHeader>
          <p>{props.bio}</p>
        </ContentWrapper>
      </Wrapper>
    );
  }
};

export default UserCard;
