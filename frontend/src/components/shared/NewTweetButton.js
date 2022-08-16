import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import addTextIcon from '../../img/icons/Add text icon.svg';

const NewTweetButton = () => {

    const navigator = useNavigate();
    const toNewTweet = () => {
        navigator('/newtweet')
    }

    return (
        <NewTweet onClick={toNewTweet}>
            <img src={addTextIcon} alt="create Tweet"/>
        </NewTweet>
    );
};

const NewTweet = styled.button`
  background: var(--clr-blue);
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  padding: 1.25rem;
  border: none;
  box-shadow: 0 1px 4px hsl(0deg, 0%, 5%);
  position: fixed;
  right: calc(var(--spacing-wrapper) / 3);
  bottom: 7.5rem;
  cursor: pointer;
  
  img {
    width: 100%;
  }
`

export default NewTweetButton;