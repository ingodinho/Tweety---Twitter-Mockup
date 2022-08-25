import styled from "styled-components";

export const ButtonBig = styled.button`
  display: block;
  margin: 2rem auto;
  background-color: var(--clr-blue);
  width: 80%;
  padding: 0.5rem 6rem;
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--clr-text-white);
  border-radius: 30px;
  border: 0;
`;

export const ButtonSmall = styled.button`
  background-color: var(--clr-blue);
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  color: var(--clr-text-white);
  border-radius: 17px;
  border: 0;
`;

export const ButtonLogin = styled.button`
  display: block;
  margin: 2rem auto;
  background-color: var(--clr-text-white);
  width: 80%;
  padding: 0.5rem 6rem;
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--clr-text-prm);
  border-radius: 30px;
  border: 1px solid var(--clr-line-grey);
`;

export const ButtonFollow = styled.button`
  display: block;
  color: ${props => props.following ? '#fff' : 'var(--clr-blue)'};
  padding: 0.4rem 0;
  width: ${props => props.size === 'big' ? '8rem' : '7rem'};
  align-self: center;
  text-decoration: none;
  font-size: ${props => props.size === 'big' ? '1.4rem' : '1rem'};
  background: ${props => props.following ? 'var(--clr-blue)' : '#fff'};
  border: 1px solid var(--clr-blue);
  border-radius: 16px;
`
