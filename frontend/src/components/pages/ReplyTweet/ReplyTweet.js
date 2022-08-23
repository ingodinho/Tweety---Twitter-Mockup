import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {
    Cancel,
    Content, DeleteButton, Header,
    Img, ImgPreview, InputButton, PreviewHeader, PreviewHeadline,
    ReplyTo, SpacingContainer,
    Text,
    TextField,
    TweetWrapper,
    UserInfo,
    UserLink,
    UserPic,
    Wrapper
} from "./ReplyTweet.styles";
import profilePlaceHolder from '../../../img/profileplaceholder.png';
import Moment from "react-moment";
import {ButtonSmall} from "../../../styles/Buttons";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import ProfilePic from "../../shared/ProfilePic";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";
import {CharactersMessage, ErrorMessage, MessagesContainer} from "../NewTweet/NewTweet.styles";

const ReplyTweet = () => {
    const userData = useRecoilValue(loggedInUser);
    const navigator = useNavigate();
    const {id: tweetId} = useParams();
    const [tweet, setTweet] = useState({});
    const [userPicture, setUserPicture] = useState(null)
    const [fileUpload, setFileUpload] = useState();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const maxCharacters = 280;
    const charactersLeft = maxCharacters - content.length;

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    }

    useEffect(() => {
        if (!userData) return;
        const getTweet = async () => {
            const [response, profileShort] = await Promise.all(
                [
                    axios.get(apiLink + `/tweets/details/${tweetId}`, axiosOptions),
                    axios.get(apiLink + '/users/profileshort', axiosOptions)
                ]);
            setTweet(response.data.tweetDetails[0]);
            setUserPicture(profileShort.data.profilePictureLink);
            setIsLoading(false);
        }
        getTweet()
    }, [userData])

    const toProfile = (id) => {
        navigator(`/profile/${id}`)
    }

    const handleUpload = (e) => {
        e.preventDefault();
        setFileUpload(e.target.files[0]);
    }
    const imgSrc = fileUpload ? URL.createObjectURL(fileUpload) : null;

    const handleDelete = (e) => {
        e.preventDefault();
        setFileUpload(null);
    }

    const onePageBack = () => {
        navigator(-1);
    }

    const replyHandler = async () => {
        if(!content || maxCharacters < 0) {
            setErrorMessage('Your Tweet has to have at least 1 character and max 280 characters');
            return
        }
        const formData = new FormData();
        formData.append('tweetimage', fileUpload);
        formData.append('replyToId', tweetId);
        formData.append('content', content);

        try {
            const response = await axios.post(apiLink + '/tweets/newreply', formData, axiosOptions);
            if(!response.data.replyResult.insertedId) {
                setErrorMessage('Something wrent wrong, try again later');
                return;
            }
            navigator(`/tweet/${tweetId}`, {state: {location: 'replytweet'}});
        } catch (err) {
            console.log(err);
        }
    }

    const handleTweetChange = e => {
        setContent(e.target.value);
        setErrorMessage('')
    }

    if (isLoading) {
        return <LoadingPage/>
    } else {
        return (<>
                <Header>
                    <Cancel onClick={() => onePageBack()}>Cancel</Cancel>
                    <ButtonSmall onClick={() => replyHandler()}>Reply</ButtonSmall>
                </Header>
                <Wrapper>
                    <UserPic src={tweet.postedBy.profilePictureLink || profilePlaceHolder} alt='Profile Pic'
                             onClick={() => toProfile(tweet.postedBy)}/>
                    <TweetWrapper>
                        <UserInfo onClick={() => toProfile(tweet.postedBy)}>
                            <p>
                                {tweet.postedBy.firstName} {tweet.postedBy.lastName}
                            </p>
                            <span>@{tweet.postedBy.username}</span>
                            <span>
						&#183; <Moment fromNow>{tweet.postedAt}</Moment>
					</span>
                        </UserInfo>
                        <Content>
                            <Text>{tweet.content}</Text>
                            {tweet.imgLink && <Img src={tweet.imgLink}/>}
                        </Content>
                        <ReplyTo>Replying to <UserLink to={'/'}>@{[tweet.postedBy.username]}</UserLink> </ReplyTo>
                    </TweetWrapper>
                </Wrapper>
                <Wrapper>
                    <ProfilePic size={'big'} src={userPicture}/>
                    <TextField placeholder={'Tweet your reply'} value={content}
                               onChange={handleTweetChange}/>
                </Wrapper>
                <MessagesContainer>
                    <CharactersMessage characters={charactersLeft >= 0}>{charactersLeft >= 0 ? `${charactersLeft} Characters left` : `Too many characters: ${charactersLeft}`}</CharactersMessage>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                </MessagesContainer>
                <SpacingContainer>
                    <InputButton type="file" onChange={handleUpload}/>
                </SpacingContainer>
                <SpacingContainer>
                    {fileUpload && <>
                        <PreviewHeader>
                            <PreviewHeadline>Preview</PreviewHeadline>
                            <DeleteButton onClick={handleDelete}>Cancel</DeleteButton>
                        </PreviewHeader>
                        <ImgPreview src={imgSrc} alt=""/>
                    </>}
                </SpacingContainer>
            </>
        )

    }

}

export default ReplyTweet;