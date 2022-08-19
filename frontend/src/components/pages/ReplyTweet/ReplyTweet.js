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
import {placeHolderUser} from "../../placeholder";
import Moment from "react-moment";
import {ButtonSmall} from "../../../styles/Buttons";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import ProfilePic from "../../shared/ProfilePic";

const ReplyTweet = () => {
    const userData = useRecoilValue(loggedInUser);
    const navigator = useNavigate();
    const {id: tweetId} = useParams();
    const [tweet, setTweet] = useState({});
    const [fileUpload, setFileUpload] = useState();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getTweet = async () => {
            const response = await axios.get(apiLink + `/tweets/details/${tweetId}`);
            setTweet(response.data.tweetDetails[0]);
            setLoading(true);
        }
        getTweet()
    }, [])

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
        // const data = {
        //     replyToId: tweetId,
        //     content,
        //     userId: userData._id
        // }
        try{
        const response = await axios.post(apiLink + '/tweets/newreply', formData, {headers: {token: 'JWT ' + userData.accessToken}});
        console.log(response);
        navigator(`/tweet/${tweetId}`);
        }
        catch(err) {
            console.log(err);
        }
    }

    return (<>
            {loading && <>
                <Header>
                    <Cancel onClick={() => onePageBack()}>Cancel</Cancel>
                    <ButtonSmall onClick={() => replyHandler()}>Reply</ButtonSmall>
                </Header>
                <Wrapper>
                    <UserPic src={tweet.postedBy.profilePictureLink} alt='Profile Pic'
                             onClick={() => toProfile(tweet.postedBy)}/>
                    <TweetWrapper>
                        <UserInfo onClick={() => toProfile(tweet.postedBy)}>
                            <p>
                                {tweet.postedBy.firstName} {tweet.postedBy.lastName}
                            </p>
                            <span>@{tweet.postedBy.userName}</span>
                            <span>
						&#183; <Moment fromNow>{tweet.postedAt}</Moment>
					</span>
                        </UserInfo>
                        <Content>
                            <Text>{tweet.content}</Text>
                            {tweet.imgLink && <Img src={tweet.imgLink}/>}
                        </Content>
                        <ReplyTo>Replying to <UserLink to={'/'}>@{[placeHolderUser.userName]}</UserLink> </ReplyTo>
                    </TweetWrapper>
                </Wrapper>
                <Wrapper>
                    <ProfilePic size={'big'}/>
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
            }
        </>
    )
}

export default ReplyTweet;