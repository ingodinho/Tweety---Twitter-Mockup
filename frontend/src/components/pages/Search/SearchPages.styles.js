import styled from "styled-components";

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 2rem var(--spacing-wrapper) 0.5rem var(--spacing-wrapper);
  border-bottom: 1px solid var(--clr-line-grey);
`;

export const IconBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingsLogo = styled.img`
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