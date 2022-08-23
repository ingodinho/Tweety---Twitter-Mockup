import { useEffect, useState } from "react";
import { apiLink } from "../../utils/apiLink";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userPlaceHolderImg from "../../../img/profileplaceholder.png";
import bannerPlaceHolder from "../../../img/bannerplaceholder.png";
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
  SaveProfilePictureButton,
  SaveBannerButton,
  ResultMessage,
} from "./EditProfilePage.styling.js";

const EditProfilePage = () => {
  const userData = useRecoilValue(loggedInUser);
  const [userInfo, setUserInfo] = useState({});
  const [profilePictureUpload, setProfilePictureUpload] = useState(null);
  const [bannerUpload, setBannerUpload] = useState(null);
  const navigator = useNavigate();

  const [editedUserName, setEditedUserName] = useState("");
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const axiosOptions = {
    headers: {
      token: "JWT " + userData.accessToken,
    },
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(
        apiLink + `/users/profile/${userData.userId}`,
        axiosOptions
      );
      setUserInfo(response.data);
    };
    getUserInfo();
  }, [userData]);

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
      firstName: editedFirstName,
      lastName: editedLastName,
      bio: editedBio,
    };
    const response = await axios.post(
      apiLink + `/users/edit`,
      data,
      axiosOptions
    );
    console.log(response);
    if (response.data.insertedId) {
      onePageBack();
    }
    setSuccessMessage("Successfully updated Profile");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const saveProfilePicture = async () => {
    const formData = new FormData();

    formData.append("avatarimage", profilePictureUpload);

    const response = await axios.put(
      apiLink + `/users/avatarimage`,
      formData,
      axiosOptions
    );
    if (response.data.insertedId) {
      onePageBack();
    }
    setSuccessMessage("Successfully updated Profile Picture");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const saveProfileBanner = async () => {
    const formData = new FormData();

    formData.append("bannerimage", bannerUpload);

    const response = await axios.put(
      apiLink + `/users/bannerimage`,
      formData,
      axiosOptions
    );
    console.log(response);
    if (response.data.insertedId) {
      onePageBack();
    }
    setSuccessMessage("Successfully updated Banner Picture");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    if (userInfo) {
      setEditedUserName(userInfo.username);
      setEditedFirstName(userInfo.firstName);
      setEditedLastName(userInfo.lastName);
      setEditedBio(userInfo.bio);
    }
  }, [userInfo]);

  return (
    <>
      <Header>
        <Cancel size={26} onClick={() => onePageBack()}>
          ⬅︎
        </Cancel>
        <Headline>Edit Profile</Headline>
        <SaveButton onClick={() => saveHandler()}>Save</SaveButton>
      </Header>
      <UserWrapper>
        <Banner
          src={userInfo.bannerPictureLink || bannerPlaceHolder}
          alt="Banner"
        />
        <BannerInputButton type="file" onChange={handleBannerUpload} />
        {bannerUpload && (
          <>
            <PreviewBanner>
              <DeleteBannerButton onClick={handleBannerDelete}>
                Cancel
              </DeleteBannerButton>
              <SaveBannerButton onClick={() => saveProfileBanner()}>
                Save
              </SaveBannerButton>
            </PreviewBanner>
            <BannerPreview src={BannerSrc} alt="" />
          </>
        )}
        <UserInfo>
          <img
            src={userInfo.profilePictureLink || userPlaceHolderImg}
            alt="User"
          />
          <SpacingContainer>
            <InputButton type="file" onChange={handleProfilePictureUpload} />
          </SpacingContainer>
          {profilePictureUpload && (
            <>
              <PreviewHeader>
                <DeleteButton onClick={handleProfilePicDelete}>
                  Cancel
                </DeleteButton>
                <SaveProfilePictureButton onClick={() => saveProfilePicture()}>
                  Save
                </SaveProfilePictureButton>
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
        </EditWrapper>
        {successMessage && <ResultMessage>{successMessage}</ResultMessage>}
      </UserWrapper>
    </>
  );
};

export default EditProfilePage;
