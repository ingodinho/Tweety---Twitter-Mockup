import {
    UserInfo,
    Wrapper,
    UserPic,
    Content,
    Text,
    Img,
} from './Tweet.styles';

import {placeHolderUser, placeHolderTweet} from "../../placeholder";
import PlaceHolderImg from '../../../img/profileplaceholder.jpeg';

import {useNavigate} from 'react-router-dom';
import Moment from 'react-moment';
import TweetStats from "./TweetStats";

const Tweet = () => {
    const navigator = useNavigate();

    const toDetail = (id) => {
        navigator(`/tweet/${id}`);
    };

    const toProfile = (id) => {
        navigator(`/profile/${id}`)
    }

    return (
        <Wrapper>
            <UserPic src={PlaceHolderImg} alt='Profile Pic' onClick={()=> toProfile(placeHolderUser.userName)}/>
            <div>
                <UserInfo onClick={()=> toProfile(placeHolderUser.userName)}>
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
