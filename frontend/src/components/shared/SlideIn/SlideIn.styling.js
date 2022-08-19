import styled from "styled-components";
import {Person, List, Display, InfoSquare, DoorOpen} from 'styled-icons/bootstrap'

export const Wrapper = styled.div`
  position: fixed;
  padding: 2rem var(--spacing-wrapper);
  background: var(--clr-text-white);
  width: 60%;
  height: 100%;
  z-index: 5;
  box-shadow: 0 2px 5px hsl(0, 0%, 70%);
  transform: ${p => p.showMenu ? 'translateX(-0%)' : 'translateX(-100%)'};
  transition: transform 200ms linear;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
`

export const UserInfo = styled.article`
  margin-top: 2rem;
  margin-bottom: 2rem;
`

export const FullName = styled.h4`
  font-size: 1.6rem;
  margin-top: 1rem;
`

export const UserName = styled.span`
  font-size: 1.4rem;
  color: var(--clr-text-grey);
`

export const FollowerStats = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
`

export const StatsFlex = styled.div`
  display: flex;
  gap: 0.25rem;
  font-size: 1.4rem;

  p {
    color: var(--clr-text-grey);
  }
`

export const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`

export const Navigation = styled.ul`
  list-style: none;
  border-bottom: 1px solid var(--clr-line-grey);
`

export const NavItems = styled.li`
  padding: 2rem 0;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const ProfileIcon = styled(Person)`

`

export const ListIcon = styled(List)`

`

export const DisplayIcon = styled(Display)`
`

export const DisplayFlex = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`

export const InfoIcon = styled(InfoSquare)`
  
`

export const LogOutIcon = styled(DoorOpen)`

`