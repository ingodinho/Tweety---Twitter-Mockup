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
import {useState} from "react";

const Tweet = (props) => {

    const [showReplies, setShowReplies] = useState(false);

    console.log(props);
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
                <UserPic src={PlaceHolderImg} alt='Profile Pic' onClick={() => toProfile(placeHolderUser.userName)}/>
                <div>
                    <UserInfo onClick={() => toProfile(placeHolderUser.userName)}>
                        <p>
                            {placeHolderUser.firstName} {placeHolderUser.lastName}
                        </p>
                        <span>@{placeHolderUser.userName}</span>
                        <span>
						&#183; <Moment fromNow>{props.createdAt}</Moment>
					</span>
                    </UserInfo>
                    <Content onClick={() => toDetail(props._id)}>
                        <Text>{props.content}</Text>
                        {props.imgLink && <Img src={props.imgLink}/>}
                    </Content>
                    <TweetStats
                        stats
                        replies={props.replies.length}
                        likes={props.likes.length}
                        retweets={props.retweets.length}
                        setShowReplies={setShowReplies}
                    />
                </div>
            </Wrapper>
            <div>
                {showReplies && props.replies.map((reply)=>
                    <Tweet
                        key={reply._id}
                        {...reply}
                    />
                )}
            </div>
        </>
    );
};

export default Tweet;
