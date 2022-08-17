import HomeHeader from "./HomeHeader";
import Tweet from "../../shared/Tweet/Tweet";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";

const Home = () => {

    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getTweets = async () => {
            const response = await axios.get(apiLink + `/tweets/all`);
            setTweets(response.data.result);
            setLoading(true);
        }
        getTweets();
    }, [])

    return (
        <>
            <HomeHeader/>
            <NewTweetButton/>
            {loading && tweets.sort((a,b) => b.postedAt - a.postedAt).map((tweet =>
                    <Tweet
                        key={tweet._id}
                        {...tweet}
                    />
            ))}
        </>
    )
}

export default Home;