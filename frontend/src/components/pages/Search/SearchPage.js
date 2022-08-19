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
} from "./SearchPages.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "../../shared/Tweet/Tweet";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";

const SearchPage = () => {
  const userData = useRecoilValue(loggedInUser);
  const [search, setSearch] = useState("");
  const [searchToggle, setSearchToggle] = useState(true);
  const [allTweets, setAllTweets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!search) {
      const getAllTweets = async () => {
        const response = await axios.get(apiLink + "/tweets/all");
        setAllTweets(response.data.result);
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
        setAllTweets(searchResult.data.tweetsResult);
        setAllUsers(searchResult.data.usersResult);
        console.log(searchResult);
      };
      getSearch();
    }
  }, [searchToggle, userData]);

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <HeaderWrapper>
        <IconBar>
          <ProfilePic size={"small"} />
          <SearchInput
            placeholder="🔍 Search Tweetie"
            onChange={(e) => setSearch(e.target.value)}
          />
          <p onClick={() => setSearchToggle((prev) => !prev)}>
            <SearchLogo src={SearchLogoUrl} alt="Settings Logo" />
          </p>
        </IconBar>
        <div>
          {allTweets.length > 0 &&
            allTweets.map((tweet) => <Tweet key={tweet._id} {...tweet} />)}
        </div>

        <div>
          {allUsers.length > 0 &&
            allUsers.map((tweet) => <Tweet key={tweet._id} {...tweet} />)}
        </div>
      </HeaderWrapper>
    );
  }
};

export default SearchPage;
