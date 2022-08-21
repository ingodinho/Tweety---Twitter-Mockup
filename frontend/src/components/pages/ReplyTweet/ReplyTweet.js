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

const ReplyTweet = () => {
    const userData = useRecoilValue(loggedInUser);
    const navigator = useNavigate();
    const {id: tweetId} = useParams();
    const [tweet, setTweet] = useState({});
    const [userPicture, setUserPicture] = useState(null)
    const [fileUpload, setFileUpload] = useState();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    }

    useEffect(() => {
        if(!userData) return;
        const getTweet = async () => {
            const [response, profileShort] = await Promise.all(
                [
                    axios.get(apiLink + `/tweets/details/${tweetId}`),
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
        const formData = new FormData();
        formData.append('tweetimage', fileUpload);
        formData.append('replyToId', tweetId);
        formData.append('content', content);

        try{
        const response = await axios.post(apiLink + '/tweets/newreply', formData, {headers: {token: 'JWT ' + userData.accessToken}});
        console.log(response);
        navigator(`/tweet/${tweetId}`);
        }
        catch(err) {
            console.log(err);
        }
    }

    if(isLoading) {
        return <LoadingPage/>
    }
    else {
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
                               onChange={e => setContent(e.target.value)}/>
                </Wrapper>
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