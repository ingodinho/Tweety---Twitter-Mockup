import styled from "styled-components";

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
  height: 100%;
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