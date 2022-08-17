import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../../img/icons/Home Solid Icon.svg";
import SearchIcon from "../../img/icons/Search Stroke Icon.svg";
import BellIcon from "../../img/icons/Bell Stroke Icon.svg";
import MailIcon from "../../img/icons/Mail Stroke Icon.svg";

const BottomNav = () => {
  return (
    <>
      <Spacer />
      <NavWrapper>
        <NavBar>
          <li>
            <NavLink to={"/home"}>
              <Icon src={HomeIcon} alt={"Home"} />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/search"}>
              <Icon src={SearchIcon} alt={"Search"} />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"}>
              <Icon src={BellIcon} alt={"Notifications"} />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"}>
              <Icon src={MailIcon} alt={"Messages"} />
            </NavLink>
          </li>
        </NavBar>
      </NavWrapper>
    </>
  );
};

const Spacer = styled.div`
  height: 6rem;
`;

const NavWrapper = styled.nav`
  position: fixed;
  overflow: hidden;
  bottom: 0;
  width: 100%;
  max-width: 450px;
  padding: 2rem var(--spacing-wrapper) 2rem var(--spacing-wrapper);
  border-top: 1px solid var(--clr-line-grey);
  background: #fff;
`;

const NavBar = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin: 0 auto;
`;

export default BottomNav;
