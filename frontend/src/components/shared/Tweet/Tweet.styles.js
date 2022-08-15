import styled from "styled-components";

export const TweetWrapper = styled.div`
  padding: 3rem;
  border-bottom: 1px solid var(--clr-line-grey);
`

export const TweetHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
`

export const UserPic = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
`

export const TweetStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`

export const Stats = styled.div`
  display: flex;
  gap: 5px;
`