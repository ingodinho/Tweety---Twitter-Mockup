import styled from "styled-components";
import BirdLogoUrl from "../../../img/icons/Bird Logo.svg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <LandingScreen>
      <Link to={"/start"}>
        <BirdLogo src={BirdLogoUrl} alt="Bird Logo" />
      </Link>
    </LandingScreen>
  );
};

const LandingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--clr-blue);
`;

const BirdLogo = styled.img`
  width: 65px;
  height: 65px;
`;

export default LandingPage;
