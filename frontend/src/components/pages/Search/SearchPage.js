import ProfilePic from "../../shared/ProfilePic";
import SearchLogoUrl from "../../../img/tweet-icons/Search Stroke Icon blue.svg";
import {apiLink} from "../../utils/apiLink";
import {loggedInUser} from "../../utils/SharedStates";
import {useRecoilValue} from "recoil";
import {
    HeaderWrapper,
    IconBar,
    SearchInput,
    SearchLogo,
    Menu,
    NavButtons,
} from "./SearchPages.styles";
import {useEffect, useState} from "react";
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
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingContent, setIsLoadingContent] = useState(true);
    const [currentNav, setCurrentNav] = useState("searchedTweets");
    const [userProfilePic, setUserProfilePic] = useState(null);

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    }

    const searchUsers = () => {
        setCurrentNav("searchedUsers");
        setIsLoading(true);
    };

    const searchTweets = () => {
        setCurrentNav("searchedTweets");
        setIsLoading(true);
    };

    useEffect(() => {
        if (!userData) return;
        if (!search) {
            const getAllTweets = async () => {
                const [response, userProfilePic, allUsersData] = await Promise.all(
                    [
                        axios.get(apiLink + "/tweets/all"),
                        axios.get(apiLink + '/users/profileshort', axiosOptions),
                        axios.get(apiLink + '/users/allusers')
                    ]);
                setAllTweets(response.data.result);
                setUserProfilePic(userProfilePic.data.profilePictureLink);
                setAllUsers(allUsersData.data);
                setIsLoading(false);
                setIsLoadingContent(false);
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
            };
            getSearch();
        }

    }, [searchToggle, userData, currentNav]);

    if (isLoading) {
        return <LoadingPage/>;
    } else {
        return (
            <>
                <HeaderWrapper>
                    <IconBar>
                        <ProfilePic size={"small"} src={userProfilePic}/>
                        <SearchInput
                            placeholder="🔍 Search Tweetie"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <p onClick={() => setSearchToggle((prev) => !prev)}>
                            <SearchLogo src={SearchLogoUrl} alt="Settings Logo"/>
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
                </HeaderWrapper>
            </>
        );
    }
};

export default SearchPage;
