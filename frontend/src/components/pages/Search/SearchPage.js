import ProfilePic from "../../shared/ProfilePic";
import SearchLogoUrl from "../../../img/tweet-icons/Search Stroke Icon blue.svg";
import { apiLink } from "../../utils/apiLink";
import { loggedInUser } from "../../utils/SharedStates";
import { useRecoilValue } from "recoil";
import {
  HeaderWrapper,
  IconBar,
  SearchInput,
  SearchLogo,
  Menu,
  NavButtons,
} from "./SearchPages.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "../../shared/Tweet/Tweet";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";
import UserCard from "../../shared/UserCard/UserCard";

const SearchPage = () => {
  const userData = useRecoilValue(loggedInUser);
  const [search, setSearch] = useState("");
  const [searchToggle, setSearchToggle] = useState(true);
  const [allTweets, setAllTweets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [topTweets, setTopTweets] = useState([]);
  const [topUser, setTopUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentNav, setCurrentNav] = useState("searchedTweets");
  const [userProfilePic, setUserProfilePic] = useState(null);

  const axiosOptions = {
    headers: {
      token: "JWT " + userData?.accessToken,
    },
  };

  const searchTweets = () => {
    setAllUsers([]);
    setTopTweets([]);
    setTopUser([]);
    setCurrentNav("searchedTweets");
  };

  const searchUsers = () => {
    setAllTweets([]);
    setTopTweets([]);
    setTopUser([]);
    setCurrentNav("searchedUsers");
  };

  const searchtopTweets = () => {
    setAllTweets([]);
    setAllUsers([]);
    setTopUser([]);
    setCurrentNav("searchedtopTweets");
  };

  const searchtopUser = () => {
    setAllTweets([]);
    setAllUsers([]);
    setTopTweets([]);
    setCurrentNav("searchedtopUser");
  };

  useEffect(() => {
    if (!userData) return;
    if (!search) {
      const getAllTweets = async () => {
        const [response, userProfilePic, allUsersData, topTweets, topUsers] =
          await Promise.all([
            axios.get(apiLink + "/tweets/all", axiosOptions),
            axios.get(apiLink + "/users/profileshort", axiosOptions),
            axios.get(apiLink + "/users/allusers", axiosOptions),
            axios.get(apiLink + "/search/toptweets", axiosOptions),
            axios.get(apiLink + "/search/topusers", axiosOptions),
          ]);
        setAllTweets(response.data.result);
        setUserProfilePic(userProfilePic.data.profilePictureLink);
        setAllUsers(allUsersData.data);
        setTopTweets(topTweets.data.tweetsResult);
        setTopUser(topUsers.data);
        setIsLoading(false);
      };
      getAllTweets();
    } else {
      const getSearch = async () => {
        const searchResult = await axios.get(apiLink + `/search/${search}`, {
          headers: {
            token: "JWT " + userData.accessToken,
          },
        });
        setTopTweets(searchResult.data.topTweetsResult);
        setTopUser(searchResult.data.topUserResult);
        setAllTweets(searchResult.data.tweetsResult);
        setAllUsers(searchResult.data.usersResult);
      };
      getSearch();
      setIsLoading(false);
    }
  }, [searchToggle, userData, currentNav]);

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <HeaderWrapper>
          <IconBar>
            <ProfilePic size={"small"} src={userProfilePic} />
            <SearchInput
              placeholder="🔍 Search Tweetie"
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setSearchToggle((prev) => !prev);
                }
              }}
            />
            <p onClick={() => setSearchToggle((prev) => !prev)}>
              <SearchLogo src={SearchLogoUrl} alt="Settings Logo" />
            </p>
          </IconBar>
          <Menu>
            <NavButtons
              active={currentNav === "searchedTweets"}
              onClick={() => searchTweets()}
            >
              Tweets
            </NavButtons>
            <NavButtons
              active={currentNav === "searchedUsers"}
              onClick={() => searchUsers()}
            >
              User
            </NavButtons>
            <NavButtons
              active={currentNav === "searchedtopTweets"}
              onClick={() => searchtopTweets()}
            >
              Top Tweets
            </NavButtons>
            <NavButtons
              active={currentNav === "searchedtopUser"}
              onClick={() => searchtopUser()}
            >
              Top User
            </NavButtons>
          </Menu>
          {currentNav === "searchedTweets" && (
            <div>
              {allTweets.length > 0 &&
                allTweets.map((tweet) => <Tweet key={tweet._id} {...tweet} />)}
            </div>
          )}
          {currentNav === "searchedUsers" && (
            <div>
              {allUsers.length > 0 &&
                allUsers.map((user) => <UserCard key={user._id} {...user} />)}
            </div>
          )}
          {currentNav === "searchedtopTweets" && (
            <div>
              {topTweets.length > 0 &&
                topTweets.map((topTweets) => (
                  <Tweet key={topTweets._id} {...topTweets} />
                ))}
            </div>
          )}
          {currentNav === "searchedtopUser" && (
            <div>
              {topUser?.length > 0 &&
                topUser.map((topUser) => (
                  <UserCard key={topUser._id} {...topUser} />
                ))}
            </div>
          )}
        </HeaderWrapper>
      </>
    );
  }
};

export default SearchPage;
