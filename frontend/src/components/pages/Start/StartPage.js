import styled from "styled-components";
import { ButtonLogin, ButtonBig } from "../../../styles/Buttons";
import BirdLogoUrl from "../../../img/icons/Bird Logo.svg";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <HeaderWrapper>
        <IconBar>
          <Link to={"/"}>
            <BirdLogo src={BirdLogoUrl} alt="Bird Logo" />
          </Link>
        </IconBar>
      </HeaderWrapper>
      <MainWrapper>
        <Headline>Whats up out there?</Headline>
        <LinkButton to={"/login"}>
          <ButtonLogin>Login</ButtonLogin>
        </LinkButton>
        <LinkButton to={"/register"}>
          <ButtonBig>Create Account</ButtonBig>
        </LinkButton>
        <Policy>
          By signing up, you agree to our Terms, Privacy Policy and Cookie Use.
        </Policy>
      </MainWrapper>
    </>
  );
};

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 2rem var(--spacing-wrapper) 0.5rem var(--spacing-wrapper);
  border-bottom: 1px solid var(--clr-line-grey);
`;

const IconBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BirdLogo = styled.img`
  width: 27px;
  height: 27px;
`;

const MainWrapper = styled.main`
  margin: 20vh 0 0 0;
  padding: 0 4rem;
`;

const Headline = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  padding: 0 0 20vh 0;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
`;

const Policy = styled.p`
  font-size: 1.55rem;
`;

export default StartPage;
