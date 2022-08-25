import styled from "styled-components";

export const MessageFooter = styled.div`
  padding: 1rem;
  background-color: var(--clr-text-white);
  height: 7.5rem;
  position: fixed;
  width: 100%;
  max-width: 450px;
  bottom: 6.5rem;
`

export const InputForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const InputField = styled.input`
  width: 80%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  padding: 5px;
  font-size: 1.4rem;
`