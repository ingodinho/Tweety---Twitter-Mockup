import { ArrowIosBack } from "styled-icons/evaicons-solid";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BackButton = ({ path }) => {
  const navigator = useNavigate();

  const toPath = (path) => {
    if (path) {
      navigator(path);
      return;
    }
    navigator(-1);
  };

  return <ArrowBack size={22} onClick={() => toPath(path)}></ArrowBack>;
};

const ArrowBack = styled(ArrowIosBack)`
  color: var(--clr-blue);
  position: fixed;
  left: var(--spacing-wrapper);
  margin-top: 2.5rem;
  z-index: 4000;
  filter: drop-shadow(-1px 1px 1px var(--clr-text-prm));
`;

export default BackButton;
