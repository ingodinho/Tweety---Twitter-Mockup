import styled from "styled-components";

export const FormWrapper = styled.form`
  padding: 50px;
`;

export const Disclaimer = styled.p`
  margin: 5vh 0 0 0;
  font-size: 1.6rem;
`;

export const ResultMessage = styled.p`
  margin: 3vh 0 0 0;
  font-size: 1.6rem;
  color: var(--clr-text-prm);
`;

export const InputDob = styled.input`
  margin: 0 auto;
  display: block;
  color: var(--clr-text-prm);
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
