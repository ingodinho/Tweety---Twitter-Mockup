import HomeHeader from "./HomeHeader";
import Tweet from "../../shared/Tweet/Tweet";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";

const Home = () => {
    const userData = useRecoilValue(loggedInUser);
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getTweets = async () => {
            if(!userData._id) return;
            const tweetsFollowed = await axios.get(apiLink + `/tweets/followed/${userData._id}`);
            if (tweetsFollowed.data.result.length > 0) {
                setTweets(tweetsFollowed.data.result);
            } else {
                const allTweets = await axios.get(apiLink + '/tweets/all');
                setTweets(allTweets.data.result);
            }
            setLoading(true);
        }
        getTweets();
    }, [userData._id])

    return (
        <>
            <HomeHeader/>
            <NewTweetButton/>
            {loading && tweets.sort((a, b) => b.postedAt - a.postedAt).map((tweet =>
                    <Tweet
                        key={tweet._id}
                        {...tweet}
                    />
            ))}
        </>
    )
}

export default Home;