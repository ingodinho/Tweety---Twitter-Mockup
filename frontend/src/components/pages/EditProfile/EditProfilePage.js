import { useEffect, useState } from "react";
import { apiLink } from "../../utils/apiLink";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { placeHolderUser } from "../../placeholder";
import UserPic from "../../../img/profileplaceholder.jpeg";
import { loggedInUser } from "../../utils/SharedStates";
import {
  Header,
  Headline,
  SaveButton,
  Cancel,
  UserWrapper,
  Banner,
  UserInfo,
  SpacingContainer,
  InputButton,
  PreviewHeader,
  DeleteButton,
  DeleteBannerButton,
  ImgPreview,
  PreviewBanner,
  BannerInputButton,
  BannerPreview,
  EditWrapper,
  EditField,
  EditBio,
} from "./EditProfilePage.styling.js";

const EditProfilePage = () => {
  const userData = useRecoilValue(loggedInUser);
  const [userInfo, setUserInfo] = useState([]);
  const [profilePictureUpload, setProfilePictureUpload] = useState(null);
  const [bannerUpload, setBannerUpload] = useState(null);
  const navigator = useNavigate();

  const [editedUserName, setEditedUserName] = useState();
  const [editedFirstName, setEditedFirstName] = useState();
  const [editedLastName, setEditedLastName] = useState();
  const [editedBio, setEditedBio] = useState();
  const [editedDob, setEditedDob] = useState();

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const response = await axios.put(apiLink + `/users/edit`, {
  //       headers: {
  //         token: "JWT " + userData.accessToken,
  //       },
  //     });
  //     setUserInfo(response.data);
  //   };
  //   getUserInfo();
  // }, []);

  const handleProfilePictureUpload = (e) => {
    e.preventDefault();
    setProfilePictureUpload(e.target.files[0]);
  };
  const ProfilePictureSrc = profilePictureUpload
    ? URL.createObjectURL(profilePictureUpload)
    : null;

  const handleBannerUpload = (e) => {
    e.preventDefault();
    setBannerUpload(e.target.files[0]);
  };
  const BannerSrc = bannerUpload ? URL.createObjectURL(bannerUpload) : null;

  const handleBannerDelete = (e) => {
    e.preventDefault();
    setBannerUpload(null);
  };

  const handleProfilePicDelete = (e) => {
    e.preventDefault();
    setProfilePictureUpload(null);
  };

  const onePageBack = () => {
    navigator(-1);
  };

  const saveHandler = async () => {
    const data = {
      userId: userData._id,
      username: editedUserName,
      firstname: editedFirstName,
      lastname: editedLastName,
      bio: editedBio,
      dob: editedDob,
    };
    const response = await axios.post(apiLink + `/users/edit`, data, {
      headers: {
        token: "JWT " + userData.accessToken,
      },
    });
    if (response.data.insertedId) {
      onePageBack();
    }
  };

  return (
    <>
      <Header>
        <Cancel onClick={() => onePageBack()}>⬅︎</Cancel>
        <Headline>Edit Profile</Headline>
        <SaveButton onClick={() => saveHandler()}>Save</SaveButton>
      </Header>
      <UserWrapper>
        <Banner src={placeHolderUser.bannerLink} alt="Banner" />
        <BannerInputButton type="file" onChange={handleBannerUpload} />
        {bannerUpload && (
          <>
            <PreviewBanner>
              <DeleteBannerButton onClick={handleBannerDelete}>
                Cancel
              </DeleteBannerButton>
            </PreviewBanner>
            <BannerPreview src={BannerSrc} alt="" />
          </>
        )}
        <UserInfo>
          <img src={UserPic} alt="User" />
          <SpacingContainer>
            <InputButton type="file" onChange={handleProfilePictureUpload} />
          </SpacingContainer>
          {profilePictureUpload && (
            <>
              <PreviewHeader>
                <DeleteButton onClick={handleProfilePicDelete}>
                  Cancel
                </DeleteButton>
              </PreviewHeader>
              <ImgPreview src={ProfilePictureSrc} alt="" />
            </>
          )}
        </UserInfo>
        <EditWrapper>
          <EditField
            placeholder="Username"
            value={editedUserName}
            onChange={(e) => setEditedUserName(e.target.value)}
          />
          <EditField
            placeholder="Firstname"
            value={editedFirstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
          />
          <EditField
            placeholder="Lastname"
            value={editedLastName}
            onChange={(e) => setEditedLastName(e.target.value)}
          />
          <EditBio
            placeholder="Bio"
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
          />
          <EditField
            value={editedDob}
            type="date"
            onChange={(e) => setEditedDob(e.target.value)}
          />
        </EditWrapper>
      </UserWrapper>
    </>
  );
};

export default EditProfilePage;
