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
import {useState} from "react";

const Tweet = (props) => {

    const [showReplies, setShowReplies] = useState(false);
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
                <UserPic src={PlaceHolderImg} alt='Profile Pic' onClick={() => toProfile(props.postedBy)}/>
                <TweetWrapper>
                    <UserInfo onClick={() => toProfile(props.postedBy)}>
                        <p>
                            {placeHolderUser.firstName} {placeHolderUser.lastName}
                        </p>
                        <span>@{placeHolderUser.userName}</span>
                        <span>
						&#183; <Moment fromNow>{props.postedAt}</Moment>
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
                </TweetWrapper>
            </Wrapper>
            <div>
            </div>
        </>
    );
};

export default Tweet;
