import styled from "styled-components";

export const InputField = styled.input`
  margin: 0 auto;
  display: block;
  color: var(--clr-text-prm);
  width: 90%;
  border: 0;
  border-bottom: 1px solid var(--clr-line-grey);
  padding: 2px 0;
  font-size: 2rem;

  &:focus {
    border-bottom: 2px solid var(--clr-blue);
    outline: none;
  }
`;
