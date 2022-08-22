import {useState} from "react";
import {InputField} from "../../../styles/InputField";
import {ButtonBig} from "../../../styles/Buttons";
import {Headline} from "../../../styles/Headline";
import {FormWrapper} from "../Register/RegisterStyling";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilState, useSetRecoilState} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const navigator = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userData, setUserData] = useRecoilState(loggedInUser);

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        const loginData = {
            email,
            password
        }

        const response = await axios.post(apiLink + '/users/login', loginData, {
            withCredentials: true
        });

        if (response.data.message) {
            return setErrorMessage(response.data.message);
        }
        setUserData(response.data);
        navigator('/home');
        setErrorMessage("");
        setEmail("");
        setPassword("");
    };

    return (
        <FormWrapper>
            <Headline>Log in to your account</Headline>
            <InputField
                required
                placeholder="Your Email here"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                required
                placeholder="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonBig type="submit" onClick={handleSubmit}>
                Log In
            </ButtonBig>

            {/* <FeedbackMessage type="error" message={errorMessage} /> */}
            {errorMessage && <p>{errorMessage}</p>}
        </FormWrapper>
    );
};

export default LoginForm;
