import HomeHeader from "./HomeHeader";
import Tweet from "../../shared/Tweet/Tweet";
import NewTweetButton from "../../shared/NewTweetButton";

const Home = () => {
    return(
        <>
            <HomeHeader/>
            <NewTweetButton/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
        </>
    )
}

export default Home;