import styled from "styled-components";
import ProfilePic from "../../shared/ProfilePic";
import SettingsLogoUrl from "../../../img/icons/Settings Stroke Icon.svg";
import { Link } from "react-router-dom";
import { apiLink } from "../../utils/apiLink";

const SearchPage = () => {
  return (
    <HeaderWrapper>
      <IconBar>
        <ProfilePic size={"small"} />
        <SearchInput placeholder="🔍 Search Tweetie" />
        <Link to={"/profile/:id"}>
          <SettingsLogo src={SettingsLogoUrl} alt="Settings Logo" />
        </Link>
      </IconBar>
    </HeaderWrapper>
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
  justify-content: space-between;
  align-items: center;
`;

const SettingsLogo = styled.img`
  width: 27px;
  height: 27px;
`;

const SearchInput = styled.input`
  width: 70%;
  height: 32px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid var(--clr-line-grey);
  font-size: 1.6rem;
`;

export default SearchPage;
