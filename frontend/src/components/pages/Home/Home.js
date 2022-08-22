import HomeHeader from "./HomeHeader";
import Tweet from "../../shared/Tweet/Tweet";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";
import styled from "styled-components";

const Home = () => {
    const userData = useRecoilValue(loggedInUser);
    const [tweets, setTweets] = useState([]);
    const [userProfilePicture, setUserProfilePicture] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    }

    useEffect(() => {
        const getTweets = async () => {
            if (!userData) return;
            const [tweetsFollowed, profileShort] = await Promise.all(
                [
                    axios.get(apiLink + `/tweets/followed`, axiosOptions),
                    axios.get(apiLink + '/users/profileshort', axiosOptions)
                ]);
            setUserProfilePicture(profileShort.data.profilePictureLink);

            if (tweetsFollowed.data.result.length > 0) {
                setTweets(tweetsFollowed.data.result);
            } else {
                const allTweets = await axios.get(apiLink + '/tweets/all');
                setTweets(allTweets.data.result);
            }

            setIsLoading(false);
        }
        getTweets();
    }, [userData])

    if (isLoading) {
        return <LoadingPage/>
    } else {
        return (
            <>
                <HomeHeader userProfilePicture={userProfilePicture}/>
                <NewTweetButton/>
                <TweetWrapper>
                    {tweets.map((tweet =>
                            <Tweet
                                key={tweet._id}
                                {...tweet}
                            />
                    ))}
                </TweetWrapper>
            </>
        )
    }
}

export default Home;

const TweetWrapper = styled.section`
  padding: 0 var(--spacing-wrapper);
`