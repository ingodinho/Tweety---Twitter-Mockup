import ProfilePic from "../../shared/ProfilePic";
import SearchLogoUrl from "../../../img/tweet-icons/Search Stroke Icon blue.svg";
import { Link } from "react-router-dom";
import { apiLink } from "../../utils/apiLink";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "../../utils/SharedStates";
import {
  HeaderWrapper,
  IconBar,
  SearchInput,
  SearchLogo,
} from "./SearchPages.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "../../shared/Tweet/Tweet";

const SearchPage = () => {
  const userData = useRecoilValue(loggedInUser);
  const [search, setSearch] = useState("");
  const [searchToggle, setSearchToggle] = useState(true);
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    if (!search) {
      const getAllTweets = async () => {
        const response = await axios.get(apiLink + "/tweets/all");
        setAllTweets(response.data.result);
      };
      getAllTweets();
    } else {
      const getSearch = async () => {
        const searchResult = await axios.get(apiLink + `/search/${search}`, {
          headers: {
            token: "JWT " + userData.accessToken,
          },
        });
        console.log(searchResult);
      };
      getSearch();
    }
  }, [searchToggle]);

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
    </HeaderWrapper>
  );
};

export default SearchPage;
