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

import PlaceHolderImg from '../../../img/profileplaceholder.jpeg';
import CommentIcon from '../../../img/tweet-icons/Comment stroke icon.svg';
import RetweetIcon from '../../../img/tweet-icons/Retweet stroke icon.svg';
import HeartIcon from '../../../img/tweet-icons/Heart stroke icon.svg';
import ShareIcon from '../../../img/tweet-icons/Share stroke icon.svg';

import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';

const placeHolderTweet = {
	_id: 'Moini',
	postedBy: 2389238923829,
	createdAt: Date.now(),
	content: `"Wichtig ist, dass er jetzt eine klare Linie in sein Leben bringt." (Lothar Matthäus zum Kokaingeständnis von Christoph Daum)\n
        "Ein Wort gab das andere - wir hatten uns nichts zu sagen." (Matthäus über einen Zwist)
        `,
	likes: ['2389238239', '2343223423423', '234142134214231', '234184237u92431'],
	retweets: [
		'2389238239',
		'2343223423423',
		'234142134214231',
		'234184237u92431',
	],
	imgLink:
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF7LIArb6-64JPs8ja6YsyFpYJCczZf8R-VA&usqp=CAU',
	replies: [
		{
			replyId: 23423243,
			createdAt: Date.now(),
			postedBy: 1231231213,
			content: 'Dies ist eine Antwort',
			likes: [
				'2389238239',
				'2343223423423',
				'234142134214231',
				'234184237u92431',
			],
			imgLink: null,
		},
	],
};

const placeHolderUser = {
	firstName: 'Lothar',
	lastName: 'Matthäus',
	userName: 'loddar',
};

const Tweet = () => {
	const navigator = useNavigate();
	
    const toDetail = (id) => {
		navigator(`/tweet/${id}`);
	};
    
	return (
		<Wrapper>
			<UserPic src={PlaceHolderImg} alt='Profile Pic' />
			<div onClick={() => toDetail(placeHolderTweet._id)}>
				<UserInfo>
					<p>
						{placeHolderUser.firstName} {placeHolderUser.lastName}
					</p>
					<span>@{placeHolderUser.userName}</span>
					<span>
						&#183; <Moment fromNow>{placeHolderTweet.createdAt}</Moment>
					</span>
				</UserInfo>
				<Content>
					<Text>{placeHolderTweet.content}</Text>
					{placeHolderTweet.imgLink && <Img src={placeHolderTweet.imgLink} />}
				</Content>
				<StatsWrapper>
					<Stats>
						<img src={CommentIcon} alt='comment' />
						<span>{placeHolderTweet.replies.length}</span>
					</Stats>
					<Stats>
						<img src={RetweetIcon} alt='comment' />
						<span>{placeHolderTweet.retweets.length}</span>
					</Stats>
					<Stats>
						<img src={HeartIcon} alt='comment' />
						<span>{placeHolderTweet.likes.length}</span>
					</Stats>
					<Stats>
						<img src={ShareIcon} alt='comment' />
					</Stats>
				</StatsWrapper>
			</div>
		</Wrapper>
	);
};

export default Tweet;
