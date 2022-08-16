import {Stats, StatsWrapper} from "./Tweet.styles";
import CommentIcon from "../../../img/tweet-icons/Comment stroke icon.svg";
import RetweetIcon from "../../../img/tweet-icons/Retweet stroke icon.svg";
import HeartIcon from "../../../img/tweet-icons/Heart stroke icon.svg";
import ShareIcon from "../../../img/tweet-icons/Share stroke icon.svg";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useState} from "react";

const TweetStats = ({stats, big, likes, replies, retweets, id, liked}) => {
    const navigator = useNavigate();
    const userdata = useRecoilValue(loggedInUser);
    const [likedStatus, setLikedStatus] = useState(liked);
    const [likesCounter, setLikesCounter] = useState(likes);
    const likeHandler = async () => {
        const data = {
            tweetId: id,
            userId: userdata._id
        }
        const response = await axios.post(apiLink + '/tweets/like', data);
        likedStatus ? setLikesCounter(prev=> prev -1) : setLikesCounter(prev => prev + 1);
        setLikedStatus(prev => !likedStatus);
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
            <Stats big={big} liked={likedStatus}>
                <img src={HeartIcon} alt='comment' onClick={() => likeHandler()}/>
                {stats && <span>{likesCounter}</span>}
            </Stats>
            <Stats big={big}>
                <img src={ShareIcon} alt='comment'/>
            </Stats>
        </StatsWrapper>
    )
}

export default TweetStats;