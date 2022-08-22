import {CommentIcon, HeartIcon, RetweetIcon, ShareIcon, Stats, StatsWrapper} from "./Tweet.styles";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, tweetStateFamily} from "../../utils/SharedStates";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";


const TweetStats = ({stats, big, replies, retweets, id}) => {
    const [tweetData, setTweetData] = useRecoilState(tweetStateFamily(id));
    const navigator = useNavigate();
    const userdata = useRecoilValue(loggedInUser);

    const axiosOptions = {
        headers: {
            token: "JWT " + userdata?.accessToken,
        },
    };

    const likeHandler = async () => {
        const data = {
            tweetId: id,
            userId: userdata.userId
        }
        const response = await axios.put(apiLink + '/tweets/like', data, axiosOptions);
        const currentLikesArray = [...tweetData.likes];
        let updatedLikesArray;
        if(tweetData.liked) {
            updatedLikesArray = currentLikesArray.filter(userId => userId !== userdata.userId);
            setTweetData(prev => ({...prev, likes: updatedLikesArray, liked: !prev.liked}));
        } else {
            currentLikesArray.push(userdata.userId);
            setTweetData(prev => ({...prev, likes: currentLikesArray, liked: !prev.liked}));
        }
    }

    return (
        <StatsWrapper>
            <Stats>
                <CommentIcon size={big ? 20 : 18} onClick={() => navigator(`/reply/${id}`)}/>
                {stats && <span>{replies}</span>}
            </Stats>
            <Stats big={big}>
                <RetweetIcon size={big ? 20 : 18} />
                {stats && <span>{retweets}</span>}
            </Stats>
            <Stats big={big} >
                <HeartIcon size={big ? 20 : 18} onClick={() => likeHandler()} liked={tweetData.liked}/>
                {stats && <span>{tweetData.likes?.length}</span>}
            </Stats>
            <Stats big={big}>
                <ShareIcon size={big ? 20 : 18}/>
            </Stats>
        </StatsWrapper>
    )
}

export default TweetStats;