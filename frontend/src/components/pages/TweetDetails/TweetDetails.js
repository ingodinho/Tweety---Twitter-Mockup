import {
    Content,
    TweetHeader,
    Headline,
    Info,
    Stats,
    StatsWrapper,
    Time,
    UserInfo,
    UserPic,
    Wrapper, Header, HomeLink
} from './TweetDetails.styling';
import Moment from "react-moment";
import {useNavigate,useParams} from "react-router-dom";

import Tweet from "../../shared/Tweet/Tweet";
import Userplaceholder from '../../../img/profileplaceholder.jpeg';
import TweetStats from "../../shared/Tweet/TweetStats";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, tweetStateFamily} from "../../utils/SharedStates";

const TweetDetails = () => {
    const {id} = useParams();
    const userData = useRecoilValue(loggedInUser);

    const [tweetData, setTweetData] = useRecoilState(tweetStateFamily(id));
    const [replies, setReplies] = useState([]);
    const navigator = useNavigate()

    useEffect(()=> {
        const getTweetDetails = async () => {
            const response = await axios.get(apiLink + `/tweets/details/${id}`);
            setTweetData({...response.data.tweetDetails[0], liked: response.data.tweetDetails[0].likes.includes(userData._id)});
            setReplies(response.data.repliesById.result);
        }
        getTweetDetails();
    },[id])

    const toProfile = (id) => {
        navigator(`/profile/${id}`)
    }

    return (
        <>
            <Header>
                <HomeLink to={'/home'}>Back</HomeLink>
                <Headline>Tweet</Headline>
            </Header>
            <Wrapper>
                <TweetHeader onClick={()=> toProfile(tweetData.postedBy._id)}>
                    <UserPic src={Userplaceholder} alt="Profile Pic"/>
                    <UserInfo>
                        <p>{tweetData.postedBy.firstName} {tweetData.postedBy.lastName}</p>
                        <span>@{tweetData.postedBy.username}</span>
                    </UserInfo>
                </TweetHeader>
                <Content>
                    <p>{tweetData.content}</p>
                    {tweetData.imgLink && <img src={tweetData.imgLink} alt={'embedded in Tweet'}/>}
                </Content>
                <Info>
                    <Time><Moment format={`HH:MM - MM/DD/YY`}>{tweetData.createdAt}</Moment></Time>
                    <span>&#183;</span>
                    <p>Tweety Web App</p>
                </Info>
                <StatsWrapper>
                    <Stats>
                        <p>{tweetData.retweets?.length}</p>
                        <span>Retweets</span>
                    </Stats>
                    <Stats>
                        <p>{tweetData.likes?.length}</p>
                        <span>{tweetData.likes?.length === 1 ? 'like' : 'likes'}</span>
                    </Stats>
                </StatsWrapper>
                <TweetStats id={id} big/>
            </Wrapper>
            {replies.map((reply)=>
                <Tweet
                    key={reply._id}
                    {...reply}
                />
            )}
        </>
    );
};

export default TweetDetails;
