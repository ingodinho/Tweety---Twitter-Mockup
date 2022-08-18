import ProfilePic from "../../shared/ProfilePic";
import SettingsLogoUrl from "../../../img/icons/Settings Stroke Icon.svg";
import {Link} from "react-router-dom";
import {apiLink} from "../../utils/apiLink";
import {HeaderWrapper, IconBar, SearchInput, SettingsLogo} from "./SearchPages.styles";
import {useEffect, useState} from "react";
import axios from "axios";
import Tweet from "../../shared/Tweet/Tweet";

const SearchPage = () => {

    const [allTweets, setAllTweets] = useState([]);
    useEffect(()=> {
        const getAllTweets = async () => {
            const response = await axios.get(apiLink + '/tweets/all');
            setAllTweets(response.data.result);
        }
        getAllTweets();
    },[])

    return (
        <HeaderWrapper>
            <IconBar>
                <ProfilePic size={"small"}/>
                <SearchInput placeholder="🔍 Search Tweetie"/>
                <Link to={"/profile/:id"}>
                    <SettingsLogo src={SettingsLogoUrl} alt="Settings Logo"/>
                </Link>
            </IconBar>
            <div>
                {allTweets.length > 0 && allTweets.map(tweet =>
                    <Tweet
                        key={tweet._id}
                        {...tweet}
                    />
                )}
            </div>
        </HeaderWrapper>
    );
};


export default SearchPage;
