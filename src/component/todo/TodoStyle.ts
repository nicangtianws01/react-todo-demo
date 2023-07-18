import styled from "styled-components"

export const TodoBox = styled.div`
  padding-left: 0px;
`

export const TodoUl = styled.ul`
  padding-left: 0px;
`

export const TodoToolBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  > label {
    margin-right: 10px;
  }
  > input {
    margin-right: 20px;
  }
`