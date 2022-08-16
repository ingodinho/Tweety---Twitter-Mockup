import HomeHeader from "./HomeHeader";
import Tweet from "../../shared/Tweet/Tweet";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import {placeHolderTweet} from "../../placeholder";

const Home = () => {

    const [tweets, SetTweets] = useState([]);

    useEffect(() => {
        const getTweets = async () => {
            SetTweets(placeHolderTweet)
        }
        getTweets();
    }, [])

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

export default Home;