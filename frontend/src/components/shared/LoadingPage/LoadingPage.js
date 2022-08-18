import styled from "styled-components";

const LoadingPage = () => {
    return (<LoadText>
        Loading...
    </LoadText>)
}

export default LoadingPage;

const LoadText = styled.div`
  height: 90vh;
  font-size: 4rem;
  color: var(--clr-blue);
  display: flex;
  align-items: center;
  justify-content: center;
`