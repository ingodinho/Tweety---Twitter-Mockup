import {Stats, StatsWrapper} from "./Tweet.styles";
import CommentIcon from "../../../img/tweet-icons/Comment stroke icon.svg";
import RetweetIcon from "../../../img/tweet-icons/Retweet stroke icon.svg";
import HeartIcon from "../../../img/tweet-icons/Heart stroke icon.svg";
import ShareIcon from "../../../img/tweet-icons/Share stroke icon.svg";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, tweetStateFamily} from "../../utils/SharedStates";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";

const TweetStats = ({stats, big, replies, retweets, id}) => {
    const [tweetData, setTweetData] = useRecoilState(tweetStateFamily(id));
    const navigator = useNavigate();
    const userdata = useRecoilValue(loggedInUser);

    const likeHandler = async () => {
        const data = {
            tweetId: id,
            userId: userdata._id
        }
        const response = await axios.post(apiLink + '/tweets/like', data);
        const currentLikesArray = [...tweetData.likes];
        let updatedLikesArray;
        if(tweetData.liked) {
            updatedLikesArray = currentLikesArray.filter(userId => userId !== userdata._id);
            setTweetData(prev => ({...prev, likes: updatedLikesArray, liked: !prev.liked}));
        } else {
            currentLikesArray.push(userdata._id);
            setTweetData(prev => ({...prev, likes: currentLikesArray, liked: !prev.liked}));
        }
    }

    return (
        <StatsWrapper>
            <Stats big={big}>
                <img src={CommentIcon} alt='comment' onClick={() => navigator(`/reply/${id}`)}/>
                {stats && <span>{replies}</span>}
            </Stats>
            <Stats big={big}>
                <img src={RetweetIcon} alt='comment'/>
                {stats && <span>{retweets}</span>}
            </Stats>
            <Stats big={big} liked={tweetData.liked}>
                <img src={HeartIcon} alt='comment' onClick={() => likeHandler()}/>
                {stats && <span>{tweetData.likes?.length}</span>}
            </Stats>
            <Stats big={big}>
                <img src={ShareIcon} alt='comment'/>
            </Stats>
        </StatsWrapper>
    )
}

export default TweetStats;