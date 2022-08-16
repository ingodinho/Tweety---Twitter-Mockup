import HomeHeader from "./HomeHeader";
import Tweet from "../../shared/Tweet/Tweet";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import {placeHolderTweet} from "../../placeholder";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";

const Home = () => {

    const [tweets, SetTweets] = useState([]);

    useEffect(() => {
        const getTweets = async () => {
            const response = await axios.get(apiLink + '/tweets/showalltweets');
            console.log(response.data)
            SetTweets(response.data);
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