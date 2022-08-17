import styled from "styled-components";
import CameraIcon from "../../../img/tweet-icons/Camera icon.svg";

export const Header = styled.header`
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--clr-line-grey);
`;

export const Headline = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
`;

export const SaveButton = styled.button`
  color: var(--clr-blue);
  font-size: 1.4rem;
  text-decoration: none;
  left: var(--spacing-wrapper);
  background: white;
  border-radius: 20px;
  border: none;
  padding: 5px 10px;
  font-size: 2.2rem;
  font-weight: 800;
`;

export const Cancel = styled.button`
  color: var(--clr-blue);
  font-size: 1.4rem;
  text-decoration: none;
  left: var(--spacing-wrapper);
  background: white;
  border: none;
  font-size: 2.2rem;
`;

export const UserWrapper = styled.section`
  position: relative;
  margin: 0;
`;

export const Banner = styled.img`
  aspect-ratio: 3 / 1;
  object-fit: cover;
  object-position: center;
`;

export const UserInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;

  img {
    margin-top: -3rem;
    width: 6.8rem;
    height: 6.8rem;
    border-radius: 50%;
    border: 4px solid #fff;
  }
`;

// ####### EDIT PROFILE PICTURE & BANNER ##
export const SpacingContainer = styled.div`
  padding: 2rem var(--spacing-wrapper);
`;

export const InputButton = styled.input`
  visibility: hidden;

  &::before {
    transition: all 300ms linear;
    visibility: visible;
    position: absolute;
    top: -1.9rem;
    left: 1.3rem;
    display: inline-block;
    content: url("${CameraIcon}");
    padding: 0.5rem;
    border: 2px solid var(--clr-text-white);
    border-radius: 2rem;
    color: var(--clr-text-white);
  }

  &:hover::before {
    border: 1px solid var(--clr-text-white);
  }
`;

export const PreviewHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 5vh;
  right: 87vw;
  z-index: 1;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--clr-red);
  border: none;
  background: none;
`;

export const ImgPreview = styled.img`
  position: absolute;
  margin-top: -3rem;
  width: 6.8rem;
  height: 6.8rem;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
  object-position: center;
`;

export const PreviewBanner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const BannerInputButton = styled.input`
  visibility: hidden;

  &::before {
    transition: all 300ms linear;
    visibility: visible;
    position: fixed;
    top: 13rem;
    left: 44vw;
    display: inline-flex;
    content: url("${CameraIcon}");
    padding: 0.5rem;
    border: 2px solid var(--clr-text-white);
    border-radius: 2rem;
    color: var(--clr-text-white);
  }

  &:hover::before {
    border: 1px solid var(--clr-text-white);
  }
`;

export const BannerPreview = styled.img`
  position: absolute;
  top: 0;
  aspect-ratio: 3 / 1;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export const DeleteBannerButton = styled.button`
  position: absolute;
  top: -2vh;
  right: 47vw;
  z-index: 1;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--clr-red);
  border: none;
  background: none;
`;

// ####### EDIT -> INPUT SECTION ##########

export const EditWrapper = styled.div`
  padding: 2rem 1rem 0 1rem;
`;

export const EditField = styled.input`
  width: 100%;
  font-size: 1.6rem;
  color: var(--clr-text-grey);
  margin-bottom: 0.5rem;
  border: 0;
  border-bottom: 1px solid var(--clr-line-grey);
`;

export const EditBio = styled.textarea`
  width: 100%;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  border: 0;
  border-bottom: 1px solid var(--clr-line-grey);
`;
