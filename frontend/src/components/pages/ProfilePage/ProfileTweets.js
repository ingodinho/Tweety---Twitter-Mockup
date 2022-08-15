import Tweet from "../../shared/Tweet/Tweet";
import {Menu} from "./Profile.styling";

const ProfileTweets = () => {
    return <>
        <Menu>
            <span>Tweets</span>
            <span>Likes</span>
        </Menu>
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
    </>
}

export default ProfileTweets;