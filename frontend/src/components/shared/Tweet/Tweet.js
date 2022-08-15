import {
    Stats,
    UserInfo,
    StatsWrapper,
    Wrapper,
    UserPic,
    Content,
    Text,
    Img,
} from './Tweet.styles';

import {placeHolderUser, placeHolderTweet} from "../../placeholder";
import PlaceHolderImg from '../../../img/profileplaceholder.jpeg';
import CommentIcon from '../../../img/tweet-icons/Comment stroke icon.svg';
import RetweetIcon from '../../../img/tweet-icons/Retweet stroke icon.svg';
import HeartIcon from '../../../img/tweet-icons/Heart stroke icon.svg';
import ShareIcon from '../../../img/tweet-icons/Share stroke icon.svg';

import {useNavigate} from 'react-router-dom';
import Moment from 'react-moment';
import TweetStats from "./TweetStats";

const Tweet = () => {
    const navigator = useNavigate();

    const toDetail = (id) => {
        navigator(`/tweet/${id}`);
    };

    return (
        <Wrapper>
            <UserPic src={PlaceHolderImg} alt='Profile Pic'/>
            <div>
                <UserInfo>
                    <p>
                        {placeHolderUser.firstName} {placeHolderUser.lastName}
                    </p>
                    <span>@{placeHolderUser.userName}</span>
                    <span>
						&#183; <Moment fromNow>{placeHolderTweet.createdAt}</Moment>
					</span>
                </UserInfo>
                <Content onClick={() => toDetail(placeHolderTweet._id)}>
                    <Text>{placeHolderTweet.content}</Text>
                    {placeHolderTweet.imgLink && <Img src={placeHolderTweet.imgLink}/>}
                </Content>
                <TweetStats stats/>
            </div>
        </Wrapper>
    );
};

export default Tweet;
