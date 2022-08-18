import HomeHeader from "./HomeHeader";
import Tweet from "../../shared/Tweet/Tweet";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";

const Home = () => {
    const userData = useRecoilValue(loggedInUser);
    const [tweets, setTweets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTweets = async () => {
            if (!userData) return;
            const tweetsFollowed = await axios.get(apiLink + `/tweets/followed/${userData._id}`);
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

    if(isLoading) {
        return <LoadingPage/>
    }
    else {
        return (
            <>
                <HomeHeader/>
                <NewTweetButton/>
                {tweets.map((tweet =>
                        <Tweet
                            key={tweet._id}
                            {...tweet}
                        />
                ))}
            </>
        )
    }
}

export default Home;