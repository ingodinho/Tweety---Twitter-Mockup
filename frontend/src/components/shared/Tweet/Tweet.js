import {
    UserInfo,
    Wrapper,
    UserPic,
    Content,
    Text,
    Img, TweetWrapper,
} from './Tweet.styles';

import {placeHolderUser} from "../../placeholder";
import PlaceHolderImg from '../../../img/profileplaceholder.jpeg';

import {useNavigate} from 'react-router-dom';
import Moment from 'react-moment';
import TweetStats from "./TweetStats";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, tweetStateFamily} from "../../utils/SharedStates";
import {apiLink} from "../../utils/apiLink";

const Tweet = (props) => {
    const userData = useRecoilValue(loggedInUser);
    const [loading, setLoading] = useState(false);
    const [tweetData, setTweetData] = useRecoilState(tweetStateFamily(props._id));

    useEffect(() => {
        setTweetData(prev => ({...prev, ...props, liked: props.likes.includes(userData._id)}));
        setLoading(true);
    },[]);

    const navigator = useNavigate();
    const toDetail = (id) => {
        navigator(`/tweet/${id}`);
    };

    const toProfile = (id) => {
        navigator(`/profile/${id}`)
    }

    return (
        <>{loading && <Wrapper>
            <UserPic src={apiLink + tweetData.postedBy.profilePictureLink || PlaceHolderImg} alt='Profile Pic'
                     onClick={() => toProfile(tweetData.postedBy._id)}/>
            <TweetWrapper>
                <UserInfo onClick={() => toProfile(tweetData.postedBy._id)}>
                    <p>
                        {tweetData.postedBy.firstName} {tweetData.postedBy.lastName}
                    </p>
                    <span>@{tweetData.postedBy.username}</span>
                    <span>
						&#183; <Moment fromNow>{tweetData.postedAt}</Moment>
					</span>
                </UserInfo>
                <Content onClick={() => toDetail(tweetData._id)}>
                    <Text>{tweetData.content}</Text>
                    {props.imgLink && <Img src={tweetData.imgLink}/>}
                </Content>
                <TweetStats
                    stats
                    replies={tweetData.replies?.length}
                    likes={tweetData.likes?.length}
                    retweets={tweetData.retweets?.length}
                    id={tweetData._id}
                />
            </TweetWrapper>
        </Wrapper>}

        </>
    );
};

export default Tweet;
