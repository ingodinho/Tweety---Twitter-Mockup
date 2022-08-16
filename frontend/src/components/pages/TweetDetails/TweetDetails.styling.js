import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Wrapper = styled.article`
  padding: 2rem var(--spacing-wrapper);
`
export const Header = styled.div`
  margin-top: 2.4rem;
`

export const HomeLink = styled(Link)`
  position: fixed;
  font-size: 1.6rem;
  left: var(--spacing-wrapper);
  color: var(--clr-blue);
  text-decoration: none;

  &hover {
    text-decoration: underline;
  }
`

export const Headline = styled.h1`
  text-align: center;
  font-size: 1.7rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`

export const TweetHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

export const UserPic = styled.img`
  width: 55px;
  height: 55px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  margin-bottom: 3rem;

  p {
    font-weight: 600;
  }

  span {
    color: var(--clr-text-grey);
  }
`

export const Content = styled.div`

  p {
    font-size: 2rem;
    font-weight: 300;
    line-height: 3.1rem;
    letter-spacing: -0.7px;
    color: var(--clr-text-black);
    margin-bottom: 2rem;
  }

  img {
    height: 20rem;
    object-fit: cover;
    object-position: center;
    border-radius: 12px;
    margin-bottom: 1rem;
  }
`

export const Info = styled.div`
  font-size: 1.6rem;
  display: flex;
  gap: 1rem;

  p {
    color: var(--clr-blue);
  }
`

export const Time = styled.span`
  display: block;
  color: var(--clr-text-grey);
`

export const StatsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.6rem;
  padding: 1rem 0;
  margin-top: 1rem;
  border-block: 1px solid var(--clr-line-grey);
`

export const Stats = styled.div`
  display: flex;
  gap: 5px;

  p {
    color: var(--clr-text-black);
  }

  span {
    color: var(--clr-text-grey);
  }
`