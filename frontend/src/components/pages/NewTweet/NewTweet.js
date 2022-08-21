import {
    Cancel, DeleteButton,
    Header, ImgPreview,
    InputButton, PreviewHeader, PreviewHeadline,
    SpacingContainer,
    TextField,
    TweetWrapper
} from "./NewTweet.styles";
import {ButtonSmall} from "../../../styles/Buttons";
import {useNavigate} from "react-router-dom";
import ProfilePic from "../../shared/ProfilePic";
import {useEffect, useState} from "react";
import {loggedInUser} from "../../utils/SharedStates";
import {useRecoilValue} from "recoil";
import {apiLink} from "../../utils/apiLink";
import axios from "axios";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";

const NewTweet = () => {

    const userData = useRecoilValue(loggedInUser);
    const [tweetContent, setTweetContent] = useState('');
    const [fileUpload, setFileUpload] = useState(null);
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userPicture, setUserPicture] = useState(null);

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    };

    useEffect(() => {
        if (!userData) return;
        const getUserPicture = async () => {
            const response = await axios.get(apiLink + '/users/profileshort', axiosOptions);
            setUserPicture(response.data.profilePictureLink);
            setIsLoading(false);
        }
        getUserPicture();
    })

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

    const tweetHandler = async () => {
        const formData = new FormData();
        formData.append('tweetimage', fileUpload);
        formData.append('content', tweetContent);

        const response = await axios.post(apiLink + `/tweets/newtweet`, formData, {
            headers: {
                token: `JWT ${userData.accessToken}`
            }
        });
        if (response.data.insertedId) {
            onePageBack();
        }
    }

    if (isLoading) {
        return <LoadingPage/>
    } else {
        return (
            <>
                <Header>
                    <Cancel onClick={() => onePageBack()}>Cancel</Cancel>
                    <ButtonSmall onClick={() => tweetHandler()}>Tweet</ButtonSmall>
                </Header>
                <TweetWrapper>
                    <ProfilePic size={'medium'} src={userPicture}/>
                    <TextField placeholder={`What's happening?`} value={tweetContent}
                               onChange={e => setTweetContent(e.target.value)}/>
                </TweetWrapper>
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

export default NewTweet;