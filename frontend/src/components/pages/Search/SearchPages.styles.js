import styled from "styled-components";

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 2rem var(--spacing-wrapper) 0.5rem var(--spacing-wrapper);
`;

export const IconBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchLogo = styled.img`
  width: 27px;
  height: 27px;
`;

export const SearchInput = styled.input`
  width: 70%;
  height: 32px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid var(--clr-line-grey);
  font-size: 1.6rem;
`;

export const Menu = styled.section`
  padding: 1rem var(--spacing-wrapper);
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  font-size: 1.6rem;
  border-bottom: 1px solid var(--clr-line-grey);
`;

export const NavButtons = styled.span`
  border-bottom: ${(props) =>
    props.active ? "2px solid var(--clr-blue)" : "none"};
`;
