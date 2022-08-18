import styled from "styled-components";
import {Link} from 'react-router-dom';

export const HomeLink = styled(Link)`
  color: var(--clr-blue);
  font-size: 1.4rem;
  text-decoration: none;
  position: fixed;
  left: var(--spacing-wrapper);
  margin-top: 2.5rem;
  background: white;
  border-radius: 5px;
  padding: 5px;
`

export const Banner = styled.img`
  aspect-ratio: 3 / 1;
  object-fit: cover;
  object-position: center;
`

export const UserWrapper = styled.section`
    margin: 0 var(--spacing-wrapper);
`

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  
  img {
    margin-top: -3rem;
    width: 6.8rem;
    height: 6.8rem;
    border-radius: 50%;
    border: 4px solid #fff;
  }
`

export const EditProfile = styled(Link)`
  color: var(--clr-blue);
  padding: 0.4rem 1rem;
  align-self: center;
  text-decoration: none;
  font-size: 1.4rem;
  background: #fff;
  border: 1px solid var(--clr-blue);
  border-radius: 16px;
`

export const Follow = styled.button`
  color: var(--clr-blue);
  padding: 0.4rem 1rem;
  align-self: center;
  text-decoration: none;
  font-size: 1.4rem;
  background: #fff;
  border: 1px solid var(--clr-blue);
  border-radius: 16px;
`

export const Name = styled.h2`
  font-weight: 800;
  font-size: 2.2rem;
`

export const UserName = styled.span`
  display: block;
  font-size: 1.6rem;
  color: var(--clr-text-grey);
  margin-bottom: 0.5rem;
`

export const Bio = styled.p`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`

export const Date = styled.span`
  font-size: 1.4rem;
  color: var(--clr-text-grey);
`

export const FollowerWrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 2rem;
`

export const FollowerStats = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.4rem;
  p{
    font-weight: 800;
  }
  span {
    color: var(--clr-text-grey);
  }
`

export const Menu = styled.section`
  padding: 0.5rem var(--spacing-wrapper);
  display: flex;
  gap: 2rem;
  font-size: 1.6rem;
  border-bottom: 1px solid var(--clr-line-grey);
`