import {Stats, TweetHeader, TweetStats, TweetWrapper, UserPic} from "./Tweet.styles";

import PlaceHolderImg from '../../../img/profileplaceholder.jpeg';
import CommentIcon from '../../../img/tweet-icons/Comment stroke icon.svg';
import RetweetIcon from '../../../img/tweet-icons/Retweet stroke icon.svg';
import HeartIcon from '../../../img/tweet-icons/Heart stroke icon.svg';
import ShareIcon from '../../../img/tweet-icons/Share stroke icon.svg';

import Moment from "react-moment";

const placeHolderTweet = {
    postedBy: 2389238923829,
    createdAt: Date.now(),
    content: 'Wise busy past both park when an ye no. Nay likely her length sooner thrown sex lively income. The expense windows adapted sir. Wrong widen drawn ample eat off doors money. Offending belonging promotion provision an be oh consulted ourselves it.',
    likes: ['2389238239', '2343223423423', '234142134214231', '234184237u92431'],
    retweets: ['2389238239', '2343223423423', '234142134214231', '234184237u92431'],
    imgLink: null,
    replies: [{
        replyId: 23423243,
        createdAt: Date.now(),
        postedBy: 1231231213,
        content: 'Dies ist eine Antwort',
        likes: ['2389238239', '2343223423423', '234142134214231', '234184237u92431'],
        imgLink: null,
    }]
}

const placeHolderUser = {
    firstName: 'Jonas', lastName: 'Nachname', userName: 'Username'
}

const Tweet = () => {
    return <TweetWrapper>
        <TweetHeader>
            <UserPic src={PlaceHolderImg} alt="Profile Pic"/>
            <div>
                <p>{placeHolderUser.firstName} {placeHolderUser.lastName}</p>
                <span>@{placeHolderUser.userName}</span>
                <span>&#183; <Moment fromNow>{placeHolderTweet.createdAt}</Moment></span>
                <article>
                    {placeHolderTweet.content}
                </article>
                <TweetStats>
                    <Stats>
                        <img src={CommentIcon} alt="comment"/>
                        <span>{placeHolderTweet.replies.length}</span>
                    </Stats>
                    <Stats>
                        <img src={RetweetIcon} alt="comment"/>
                        <span>{placeHolderTweet.retweets.length}</span>
                    </Stats>
                    <Stats>
                        <img src={HeartIcon} alt="comment"/>
                        <span>{placeHolderTweet.likes.length}</span>
                    </Stats>
                    <Stats>
                        <img src={ShareIcon} alt="comment"/>
                    </Stats>
                </TweetStats>
            </div>
        </TweetHeader>
    </TweetWrapper>
}

export default Tweet;