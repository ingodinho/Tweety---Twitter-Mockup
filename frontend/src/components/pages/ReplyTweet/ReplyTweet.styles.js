import styled from "styled-components";
import {Link} from "react-router-dom";
import CameraIcon from "../../../img/tweet-icons/Camera icon small.svg";

export const Wrapper = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 2rem var(--spacing-wrapper);
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem var(--spacing-wrapper);
`

export const Cancel = styled.span`
  font-size: 1.6rem;
  color: var(--clr-blue);
  cursor: pointer;
`

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
`;

export const ReplyTo = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--clr-text-grey);
  margin-top: 1rem;
`

export const UserLink = styled(Link)`
  color: var(--clr-blue);
  text-decoration: none;
`

export const TextField = styled.textarea`
  margin-top: 1rem;
  flex-basis: 100%;
  border: none;
  min-height: 15rem;
  font-size: 1.6rem;
  resize: none;

  &::placeholder {
    color: var(--clr-text-grey);
    font-size: 1.9rem;
  }

  &:focus {
    outline: none;
  }
`

export const SpacingContainer = styled.div`
  padding: 2rem var(--spacing-wrapper);
`

export const InputButton = styled.input`
  visibility: hidden;

  &::before {
  transition: all 300ms linear;
    visibility: visible;
    display: inline-block;
    content: url('${CameraIcon}');
    padding: 1.75rem;
    border: 1px solid var(--clr-line-grey);
    border-radius: 1.7rem;
  }
  
  &:hover::before {
    border: 1px solid var(--clr-blue);
  }
`

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const PreviewHeadline = styled.h4`
  font-size: 1.6rem;
  font-weight: 400;
`

export const DeleteButton = styled.button`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--clr-red);
  border: none;
  background: none;
`

export const ImgPreview = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  max-height: 30rem;
  object-fit: contain;
  object-position: center;
`