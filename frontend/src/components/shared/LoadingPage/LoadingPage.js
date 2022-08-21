import styled, {keyframes} from "styled-components";

const LoadingPage = () => {
    return (<LoadWrapper>
        <Ring><div></div><div></div><div></div><div></div></Ring>
    </LoadWrapper>)
}

export default LoadingPage;

const LoadWrapper = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Ring = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 48px;
    height: 48px;
    margin: 4px;
    border: 4px solid var(--clr-blue);
    border-radius: 50%;
    animation: ${RingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--clr-blue) transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`