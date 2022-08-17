import HomeHeader from "./HomeHeader";
import Tweet from "../../shared/Tweet/Tweet";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";

const Home = () => {

    // const userData = useRecoilValue(loggedInUser);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const getTweets = async () => {
            const response = await axios.get(apiLink + `/tweets/all`);
            setTweets(response.data);
        }
        getTweets();
    }, [])

    console.log(tweets);

    return (
        <>
            <HomeHeader/>
            <NewTweetButton/>
            {tweets.sort((a,b) => b.postedAt - a.postedAt).map((tweet =>
                    <Tweet
                        key={tweet._id}
                        {...tweet}
                    />
            ))}
        </>
    )
}

export default Home;