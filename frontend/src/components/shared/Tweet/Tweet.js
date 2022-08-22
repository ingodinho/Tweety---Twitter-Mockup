import {
    UserInfo,
    Wrapper,
    UserPic,
    Content,
    Text,
    Img, TweetWrapper, TweetBorder,
} from './Tweet.styles';

import PlaceHolderImg from '../../../img/profileplaceholder.png';
import Moment from 'react-moment';
import {useNavigate} from 'react-router-dom';
import TweetStats from "./TweetStats";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, tweetStateFamily} from "../../utils/SharedStates";

const Tweet = (props) => {
    const userData = useRecoilValue(loggedInUser);
    const [isLoading, setIsLoading] = useState(true);
    const [tweetData, setTweetData] = useRecoilState(tweetStateFamily(props._id));

    useEffect(() => {
        setTweetData(prev => ({...prev, ...props, liked: props.likes.includes(userData.userId)}));
        setIsLoading(false);
    }, []);

    const navigator = useNavigate();
    const toDetail = (id) => {
        navigator(`/tweet/${id}`);
    };

    const toProfile = (id) => {
        navigator(`/profile/${id}`)
    }

    const overMaxCharacters = (tweetData.postedBy.firstName + tweetData.postedBy.lastName + tweetData.postedBy.username).length > 20;

    const showName = () => {
        const fullName = tweetData.postedBy.firstName + ' ' + tweetData.postedBy.lastName;
        if (!overMaxCharacters) return fullName;
        else if (fullName.length > 12) {
            return fullName.slice(0, 10) + '...';
        } else {
            return fullName;
        }
    }

    const showUserName = () => {
        const username = tweetData.postedBy.username;
        if (!overMaxCharacters) return username;
        if (username.length > 12) {
            return username.slice(0, 10) + '...';
        } else {
            return username;
        }
    }

    if (isLoading) {
        return (
            <></>
        )
    } else {

        return (
            <>
                <Wrapper>
                    <UserPic src={tweetData.postedBy.profilePictureLink || PlaceHolderImg} alt='Profile Pic'
                             onClick={() => toProfile(tweetData.postedBy._id)}/>
                    <TweetWrapper>
                        <UserInfo onClick={() => toProfile(tweetData.postedBy._id)}>
                            <p>
                                {showName()}
                            </p>
                            <span>@{showUserName()}</span>
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
                <TweetBorder/>
            </>
        )
    }
};

export default Tweet;