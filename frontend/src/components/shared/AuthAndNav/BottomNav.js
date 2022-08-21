import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {HomeCircle, Bell} from 'styled-icons/boxicons-solid';
import {Search, MailSend} from 'styled-icons/boxicons-regular';

const BottomNav = () => {

    return (
        <>
            <Spacer/>
            <NavWrapper>
                <NavBar>
                    <li>
                        <NavLink to={"/home"}
                                 style={({isActive}) => isActive ? {color: '#1D9BF0'} : {color: '#687684'}}>
                            <HomeIcon/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/search"}
                                 style={({isActive}) => isActive ? {color: '#1D9BF0'} : {color: '#687684'}}>
                            <SearchIcon/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/"} style={({isActive}) => isActive ? {color: '#1D9BF0'} : {color: '#687684'}}>
                            <BellIcon/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/"} style={({isActive}) => isActive ? {color: '#1D9BF0'} : {color: '#687684'}}>
                            <MailIcon/>
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
  max-width: var(--max-width);
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

const HomeIcon = styled(HomeCircle)`
    height: 25px;
    width: 25px;
`

const SearchIcon = styled(Search)`
  height: 25px;
  width: 25px;
`

const BellIcon = styled(Bell)`
  height: 25px;
  width: 25px;
`

const MailIcon = styled(MailSend)`
  height: 25px;
  width: 25px;
`

export default BottomNav;
