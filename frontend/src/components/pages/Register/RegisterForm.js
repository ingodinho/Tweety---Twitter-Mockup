import {useState} from "react";
import {FormWrapper, Disclaimer} from "./RegisterStyling";
import {InputField} from "../../../styles/InputField";
import {ButtonBig} from "../../../styles/Buttons";
import {Headline} from "../../../styles/Headline";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
// import { apiUrl } from "INSERT_APIURL_FILE_HERE";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthday, setBirthday] = useState('')

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !username || !password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Password confirmation doesn't match.");
            return;
        }

        const userData = {
            username,
            firstName: firstname,
            lastName: lastname,
            email,
            dob: birthday,
            password
        }

        const result = await axios.post(apiLink + '/users/register', userData);
        console.log(result);

        // fetch(apiUrl + "/register", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username,
        //     email,
        //     password,
        //   }),
        // })
        //   .then((res) => res.json())
        //   .then((result) => {
        //     console.log(result);

        //     if (result.message) {
        //       return setErrorMessage(result.message);
        //     }

        //     setErrorMessage("");
        //     setSuccessMessage("Your account was created, please login.");
        //     setEmail("");
        //     setUsername("");
        //     setPassword("");
        //     setConfirmPassword("");
        //   });
    };

    return (
        <FormWrapper>
            <Headline>Create your account</Headline>
            <InputField
                required
                placeholder="Firstname"
                id="firstname"
                autoFocus
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
            />
            <InputField
                required
                placeholder="Lastname"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <InputField
                required
                placeholder="Enter Username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
                required
                placeholder="Your Email here"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                required
                placeholder="Your Birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                type={'date'}
            />
            <InputField
                required
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
                required
                placeholder="Confirm Password"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Disclaimer>
                By signing up, you agree to our Terms, Privacy Policy and Cookie Use.
                Zwitter may use your contact information, including your email address
                and phone number for purposes outlined in our Privacy Policy. Learn more
            </Disclaimer>
            <ButtonBig type="submit" onClick={handleSubmit}>
                Sign In
            </ButtonBig>

            {/* <FeedbackMessage type="error" message={errorMessage} /> */}
            {/* <FeedbackMessage type="success" message={successMessage} /> */}
        </FormWrapper>
    );
};

/*
const FeedbackMessage = ({ type = "error", message }) => {
  if (message) {
    return (
      <Box
        sx={{
          padding: 1,
          backgroundColor: type === "error" ? "crimson" : "green",
          borderRadius: 1,
        }}
      >
        <Typography component="p" variant="body1" color="white">
          {message}
        </Typography>
      </Box>
    );
  } else {
    return <></>;
  }
};
*/

export default RegisterForm;
