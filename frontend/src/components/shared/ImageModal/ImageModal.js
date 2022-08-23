import Modal from 'react-modal';
import {useRecoilState, useRecoilValue} from "recoil";
import {handleModal, loggedInUser, modalId} from "../../utils/SharedStates";
import {useEffect, useState} from "react";
import {apiLink} from "../../utils/apiLink";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import styled from "styled-components";
import placeHolderProfilePic from '../../../img/profileplaceholder.png';

const ImageModal = () => {
    const [showModal, setShowModal] = useRecoilState(handleModal);
    const [isLoading, setIsLoading] = useState(true);
    const userData = useRecoilValue(loggedInUser);
    const [idModal, setIdModal] = useRecoilState(modalId);
    const [imgSrc, setImgSrc] = useState(null);

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    }

    const closeModal = () => {
        setShowModal(false);
        setIdModal(null);
        setIsLoading(true);
    }

    useEffect(() => {
        if (!idModal) return;
        if (!userData) return;
        const getImage = async () => {
            const endPoint = idModal?.tweetId ? `/tweets/details/${idModal.tweetId}` : `/users/profile/${idModal.profileId}`;
            const response = await axios.get(apiLink + endPoint, axiosOptions);
            if (idModal?.tweetId) {
                setImgSrc(response.data.tweetDetails[0].imgLink);
            } else {
                response.data.profilePictureLink ? setImgSrc(response.data.profilePictureLink) : setImgSrc(placeHolderProfilePic);
            }
            setIsLoading(false);
        }
        getImage();
    }, [idModal, userData])

    Modal.setAppElement('#root');

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: isLoading && '80%',
            display: showModal ? 'block' : 'none',
            border: 'none',
            boxShadow: '0 0 2px var(--clr-text-grey)'
        }
    }

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={'Image in Gross'}
        >
            {isLoading && <></>}
            {!isLoading &&
                <ImageContainer>
                    <img src={imgSrc} alt="Bigger Image"/>
                    <CloseButton onClick={closeModal}>X</CloseButton>
                </ImageContainer>
            }
        </Modal>
    )
}

const ImageContainer = styled.div`
  position: relative;
`

const CloseButton = styled.span`
  color: var(--clr-red);
  font-size: 1.6rem;
  font-weight: 600;
  position: absolute;
  top: var(--spacing-wrapper);
  right: var(--spacing-wrapper);
`

export default ImageModal;

