import {
    Cancel, DeleteButton,
    Header, ImgPreview, ImgWrapper,
    InputButton, PreviewHeader, PreviewHeadline,
    SpacingContainer,
    TextField,
    TweetWrapper
} from "./NewTweet.styles";
import {ButtonSmall} from "../../../styles/Buttons";
import {useNavigate} from "react-router-dom";
import ProfilePic from "../../shared/ProfilePic";
import {useState} from "react";

const NewTweet = () => {

    const [fileUpload, setFileUpload] = useState(null);
    const navigator = useNavigate();

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

    return (
        <>
            <Header>
                <Cancel onClick={() => onePageBack()}>Cancel</Cancel>
                <ButtonSmall>Tweet</ButtonSmall>
            </Header>
            <TweetWrapper>
                <ProfilePic size={'medium'}/>
                <TextField placeholder={`What's happening?`}/>
            </TweetWrapper>
            <SpacingContainer>
                <InputButton type="file" onChange={handleUpload}/>
            </SpacingContainer>
            <SpacingContainer>
                <PreviewHeader>
                    <PreviewHeadline>Preview</PreviewHeadline>
                    {fileUpload && <DeleteButton onClick={handleDelete}>Cancel</DeleteButton>}
                </PreviewHeader>
                <ImgPreview src={imgSrc} alt=""/>
            </SpacingContainer>
        </>
    )
}

export default NewTweet;