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

const Tweet = (props) => {
    const userData = useRecoilValue(loggedInUser);

    const [tweetData, setTweetData] = useRecoilState(tweetStateFamily(props._id));

    useEffect(()=> {
        setTweetData(prev => ({...prev, ...props, liked: props.likes.includes(userData._id)}))
    },[])

    const navigator = useNavigate();
    const toDetail = (id) => {
        navigator(`/tweet/${id}`);
    };

    const toProfile = (id) => {
        navigator(`/profile/${id}`)
    }

    return (
        <>
            <Wrapper>
                <UserPic src={PlaceHolderImg} alt='Profile Pic' onClick={() => toProfile(tweetData.postedBy)}/>
                <TweetWrapper>
                    <UserInfo onClick={() => toProfile(tweetData.postedBy)}>
                        <p>
                            {placeHolderUser.firstName} {placeHolderUser.lastName}
                        </p>
                        <span>@{placeHolderUser.userName}</span>
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
            </Wrapper>
        </>
    );
};

export default Tweet;
