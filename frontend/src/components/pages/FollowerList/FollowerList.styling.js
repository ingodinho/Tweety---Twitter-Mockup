import styled from "styled-components";


export const Wrapper = styled.section`
  padding: 2rem var(--spacing-wrapper);
`

export const UserHeader = styled.div`
  margin-left: 5rem;
  font-size: 1.6rem;
  span {
    color: var(--clr-text-grey);
  }
  p{
    font-size: 1.4rem;
  }
`

export const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem 1rem;
  border-bottom: 1px solid var(--clr-line-grey);
  margin-inline: calc(var(--spacing-wrapper) * -1);
`

export const NavItems = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${p => p.active ? 'var(--clr-blue)' : 'var(--clr-text-grey)'};
  border-bottom: ${p => p.active && 'var(--clr-blue) 2px solid'};
`