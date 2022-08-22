import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {slideInMenu} from "../../utils/SharedStates";

const Overlay = () => {
    const showMenu = useRecoilValue(slideInMenu);
    if (showMenu) {
        return <OverlayBackground></OverlayBackground>
    }
}

export default Overlay;

const OverlayBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  max-width: var(--max-width);
  background: black;
  opacity: 0.4;
  transition: all 300ms linear;
  z-index: 2;
`