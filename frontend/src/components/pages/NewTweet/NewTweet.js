import {Cancel, Header, TextField, TweetWrapper} from "./NewTweet.styles";
import {ButtonSmall} from "../../../styles/Buttons";
import {useNavigate} from "react-router-dom";
import ProfilePic from "../../shared/ProfilePic";

const NewTweet = () => {

    const navigator = useNavigate();

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
        </>
    )

}

export default NewTweet;