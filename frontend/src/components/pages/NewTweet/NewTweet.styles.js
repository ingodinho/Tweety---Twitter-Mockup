import styled from "styled-components";
import CameraIcon from '../../../img/tweet-icons/Camera icon.svg';

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

export const TweetWrapper = styled.div`
  margin: 0 var(--spacing-wrapper);
  display: flex;
  gap: 1rem;
`

export const TextField = styled.textarea`
  flex-basis: 100%;
  border: none;
  min-height: 25rem;
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
