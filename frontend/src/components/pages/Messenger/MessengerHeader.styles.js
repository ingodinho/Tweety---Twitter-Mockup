import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--clr-text-white);
  position: sticky;
  top: 5.5rem;
  padding: 1rem;
`

export const UsersHeadline = styled.h4`
  padding: 1rem 0;
  font-size: 1.4rem;
`

export const UsersContainer = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  margin-bottom: 1rem;
`

export const ShowSelectedUser = styled.p`
  padding: 1rem 0;
  text-align: center;
  font-size: 2rem;
  border-block: 1px solid var(--clr-line-grey);
`
