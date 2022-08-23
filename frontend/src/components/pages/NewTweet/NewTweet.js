import {
    Cancel, CharactersMessage, DeleteButton, ErrorMessage,
    Header, ImgPreview,
    InputButton, MessagesContainer, PreviewHeader, PreviewHeadline,
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
    const [errorMessage, setErrorMessage] = useState('');
    const maxCharacters = 280;
    const charactersLeft = maxCharacters - tweetContent.length;

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
    },[fileUpload])

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
        if(!tweetContent || maxCharacters < 0) {
            setErrorMessage('Your Tweet has to have at least 1 character and max 280 characters');
            return
        }
        const formData = new FormData();
        formData.append('tweetimage', fileUpload);
        formData.append('content', tweetContent);

        const response = await axios.post(apiLink + `/tweets/newtweet`, formData, {
            headers: {
                token: `JWT ${userData.accessToken}`
            }
        });
        if(!response.data.insertedId) {
            setErrorMessage('Something wrent wrong, try again later');
        }
        if (response.data.insertedId) {
            setErrorMessage('');
            onePageBack();
        }
    }

    const handleTweetChange = e => {
        setTweetContent(e.target.value);
        setErrorMessage('')
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
                               onChange={handleTweetChange}/>
                </TweetWrapper>
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

export default NewTweet;