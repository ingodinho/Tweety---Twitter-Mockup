import {Stats, StatsWrapper} from "./Tweet.styles";
import CommentIcon from "../../../img/tweet-icons/Comment stroke icon.svg";
import {placeHolderTweet} from "../../placeholder";
import RetweetIcon from "../../../img/tweet-icons/Retweet stroke icon.svg";
import HeartIcon from "../../../img/tweet-icons/Heart stroke icon.svg";
import ShareIcon from "../../../img/tweet-icons/Share stroke icon.svg";

const TweetStats = ({stats, big, setShowReplies, likes,replies, retweets}) => {
    return (
        <StatsWrapper>
            <Stats big={big}>
                <img src={CommentIcon} alt='comment' onClick={() => setShowReplies(prev => !prev)}/>
                {stats && <span>{replies}</span>}
            </Stats>
            <Stats big={big}>
                <img src={RetweetIcon} alt='comment'/>
                {stats && <span>{retweets}</span>}
            </Stats>
            <Stats big={big}>
                <img src={HeartIcon} alt='comment' onClick={() => console.log('test')}/>
                {stats && <span>{likes}</span>}
            </Stats>
            <Stats big={big}>
                <img src={ShareIcon} alt='comment'/>
            </Stats>
        </StatsWrapper>
    )
}

export default TweetStats;