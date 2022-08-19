import styled from 'styled-components';
import {Reply, Heart, Retweet, Share} from 'styled-icons/entypo';

export const Wrapper = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 2rem var(--spacing-wrapper);
  border-bottom: 1px solid var(--clr-line-grey);
`;

export const UserPic = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
`;

export const TweetWrapper = styled.div`
  flex: 1;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;

  span {
    font-size: 1.2rem;
    color: var(--clr-text-grey);
    font-weight: 400;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
`;

export const Img = styled.img`
  margin-top: 1rem;
  height: 17.4rem;
  border-radius: 12px;
  object-fit: cover;
  object-position: center;
`

export const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const Stats = styled.div`
  display: flex;
  gap: 5px;
  color: var(--clr-text-grey);
  font-size: 1.2rem;

  img {
    width: ${p => p.big ? 18 : 15}px;
    background-color: ${p => p.liked && 'tomato'};
  }
`;

export const CommentIcon = styled(Reply)`
    
`
export const RetweetIcon = styled(Retweet)`
    
`

export const HeartIcon = styled(Heart)`
  transition: all 300ms linear;
  color: ${p => p.liked && 'red'};
`

export const ShareIcon = styled(Share)`
`