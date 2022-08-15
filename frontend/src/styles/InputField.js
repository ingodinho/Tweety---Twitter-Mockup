import styled from "styled-components";

export const InputField = styled.input`
  margin: 0 auto;
  display: block;
  width: 80vw;
  border: 0;
  border-bottom: 1px solid var(--clr-line-grey);
  padding: 2px 0;
  font-size: 2rem;

  &:focus {
    border-bottom: 2px solid var(--clr-blue);
    outline: none;
  }
`;
