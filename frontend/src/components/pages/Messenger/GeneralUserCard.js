import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {loggedInUser, messageSelectedUser} from "../../utils/SharedStates";
import {useEffect, useState} from "react";
import {apiLink} from "../../utils/apiLink";
import axios from "axios";
import ProfilePic from "../../shared/ProfilePic";
import styled from "styled-components";


const GeneralUserCard = () => {

    const [selectedUser, setSelectedUser] = useRecoilState(messageSelectedUser);

    const selectUser = () => {
        setSelectedUser(null);
    }

    return (
        <Wrapper onClick={selectUser}>
            <ProfilePic size={'big'} nolink={true} active={selectedUser === null}/>
            <UserName>General</UserName>
        </Wrapper>
    )
}

export default GeneralUserCard;

const Wrapper = styled.article`
  font-size: 1.2rem;
  flex-basis: 7rem;
`

const UserName = styled.p`
  margin-top: 0.5rem;
  text-align: center;
`