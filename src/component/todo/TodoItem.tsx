import React from 'react'
import styled, { css } from 'styled-components'

export interface TodoDetail {
  id: number
  note: string
  desc: string
  complete: boolean
}

interface Props {
  todo: TodoDetail
  toggleTodo: ToggleTodo
  deleteTodo: DeleteTodo
}

type ToggleTodo = (selectedTodo: TodoDetail) => void
type DeleteTodo = (selectedTodo: TodoDetail) => void

const Span = styled.span<{ isComplete?: boolean }>`
  font-size: 24px;
  text-decoration: ${({ isComplete }) =>
    isComplete ? 'line-through' : 'none'};
`

const CbInput = styled.input`
  line-height: 36px;
  vertical-align: middle;
`

const TodoLi = styled.li`
  list-style: none;
`

const hoverDesc = (desc: string) => {}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTodo}: Props) => {
  return (
    <>
      <TodoLi>
        <span>
          <CbInput
            type="checkbox"
            name="todo-item"
            id={'todo-item-' + todo.id}
            checked={todo.complete}
            onChange={() => {
              toggleTodo(todo)
            }}
          />
        </span>
        <Span isComplete={todo.complete}>{todo.note}</Span>
        <span>
          <button onClick={()=>{
            deleteTodo(todo)
          }}>delete</button>
        </span>
      </TodoLi>
    </>
  )
}

export default TodoItem
