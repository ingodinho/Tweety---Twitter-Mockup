import HomeHeader from "../Home/HomeHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiLink } from "../../utils/apiLink";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "../../utils/SharedStates";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";
import {
  Container,
  BigHeadline,
  Headline,
  DevName,
  DevDesc,
} from "./About.styling.js";

const About = () => {
  const userData = useRecoilValue(loggedInUser);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const axiosOptions = {
    headers: {
      token: "JWT " + userData?.accessToken,
    },
  };

  useEffect(() => {
    const getTweets = async () => {
      if (!userData) return;
      const [profileShort] = await Promise.all([
        axios.get(apiLink + "/users/profileshort", axiosOptions),
      ]);
      setUserProfilePicture(profileShort.data.profilePictureLink);

      setIsLoading(false);
    };
    getTweets();
  }, [userData]);

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <HomeHeader userProfilePicture={userProfilePicture} />
        <Container>
          <BigHeadline>About Tweety</BigHeadline>
          <Headline>Frontend Team</Headline>
          <DevName>Ingo Siemens</DevName>
          <DevDesc>Recoil (aka Rehkeule) und Frontend Imperator</DevDesc>
          <DevName>Pascal Wulff</DevName>
          <DevDesc>Einarmiger Component Styler und Frontend Mongo(DB)</DevDesc>
          <Headline>Backend Team</Headline>
          <DevName>Karim Akichouh</DevName>
          <DevDesc>AWS Backend Urukhai und Datenschutzbeauftragter</DevDesc>
          <DevName>Patrick Siegmund</DevName>
          <DevDesc>SockenJoe.io und Backend Admiral</DevDesc>
        </Container>
      </>
    );
  }
};

export default About;
