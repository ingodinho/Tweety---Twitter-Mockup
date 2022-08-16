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
import {placeHolderUser} from "../../placeholder";
import Userplaceholder from '../../../img/profileplaceholder.jpeg';
import TweetStats from "../../shared/Tweet/TweetStats";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";

const TweetDetails = () => {

    const [tweetDetails, setTweetDetails] = useState({});
    const [replies, setReplies] = useState([]);
    const {id} = useParams();
    const navigator = useNavigate()

    useEffect(()=> {
        const getTweetDetails = async () => {
            const response = await axios.get(apiLink + `/tweets/details/${id}`);
            setTweetDetails(response.data.tweetDetails[0]);
            setReplies(response.data.repliesById);
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
                <TweetHeader onClick={()=> toProfile(placeHolderUser.userName)}>
                    <UserPic src={Userplaceholder} alt="Profile Pic"/>
                    <UserInfo>
                        <p>{placeHolderUser.firstName} {placeHolderUser.lastName}</p>
                        <span>@{placeHolderUser.userName}</span>
                    </UserInfo>
                </TweetHeader>
                <Content>
                    <p>{tweetDetails.content}</p>
                    {tweetDetails.imgLink && <img src={tweetDetails.imgLink} alt={'embedded in Tweet'}/>}
                </Content>
                <Info>
                    <Time><Moment format={`HH:MM - MM/DD/YY`}>{tweetDetails.createdAt}</Moment></Time>
                    <span>&#183;</span>
                    <p>Tweety Web App</p>
                </Info>
                <StatsWrapper>
                    <Stats>
                        <p>{tweetDetails.retweets?.length}</p>
                        <span>Retweets</span>
                    </Stats>
                    <Stats>
                        <p>{tweetDetails.likes?.length}</p>
                        <span>Likes</span>
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
