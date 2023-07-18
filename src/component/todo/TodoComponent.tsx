import React, { FC, useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import TodoItem, { TodoDetail } from './TodoItem'
import { TodoBox, TodoToolBox, TodoUl } from './TodoStyle'

export interface TodoData {
  user: string
  todoList: TodoDetail[]
}
export interface TodoComponentProps {
  queryTodo: QueryTodo
}

export type QueryTodo = () => TodoDetail[]

const TodoComponent: FC = () => {

  const initValue: TodoDetail[] = []

  const [todos, setTodos] = useLocalStorage('todos', initValue)

  // get max id
  let lastestIdTmp = 0
  todos.map((todo) => {
    if (todo.id > lastestIdTmp) {
      lastestIdTmp = todo.id
    }
  })

  const [lastestId, setLastestId] = useState(lastestIdTmp)

  const noteRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLInputElement>(null)

  // toggle complete status
  const toggleTodo = (selectedTodo: TodoDetail) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === selectedTodo.id) {
        return {
          ...todo,
          complete: !todo.complete,
        }
      }
      return todo
    })
    // save
    setTodos(newTodos)
  }

  const addTodo = (todo: TodoDetail) => {
    if (!todo.note || todo.note.trim() === '') {
      alert('Please input note')
      return
    }

    // set new max id
    setLastestId(todo.id)

    // save
    const newTodos = todos.concat(todo)
    setTodos(newTodos)
  }

  const delTodo = (selectedTodo: TodoDetail) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== selectedTodo.id
    })

    // save
    setTodos(newTodos)
  }

  const getDownloadUri = (data: string) => {
    // use utf-8
    const _utf = '\uFEFF'
    if (window.Blob && window.URL) {
      const blob = new Blob([_utf + data], {
        type: 'text/json',
      })
      return URL.createObjectURL(blob)
    } else {
      return ''
    }
  }

  const exportAll = () => {
    if (todos.length < 1) {
      alert('No data!')
      return
    }
    const exportJson = JSON.stringify(todos)
    const exportUri = getDownloadUri(exportJson)
    const link: HTMLAnchorElement = document.createElement('a')
    // feature detection
    // Browsers that support HTML5 download attribute
    link.href = exportUri
    link.download = 'todos-export-' + new Date().getTime() + '.json'
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const list: React.ReactNode[] = []

  todos.map((todo) => {
    list.push(
      <TodoItem
        key={todo.id}
        {...{ todo: todo, toggleTodo: toggleTodo, deleteTodo: delTodo }}
      ></TodoItem>
    )
  })

  return (
    <>
      <div>
        <h1>Todo App</h1>
        <TodoBox>
          <TodoUl>{list}</TodoUl>
          <TodoToolBox>
            <div>
              <label htmlFor="note-input">Note: </label>
              <input type={'text'} ref={noteRef} id="note-input" />{' '}
              <label htmlFor="desc-input">Desc: </label>
              <input type={'text'} ref={descRef} id="desc-input" />{' '}
              <button
                onClick={() => {
                  addTodo({
                    id: lastestId + 1,
                    note: noteRef.current?.value + '',
                    desc: descRef.current?.value + '',
                    complete: false,
                  })
                }}
              >
                add
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  exportAll()
                }}
              >
                exportAll
              </button>
            </div>
          </TodoToolBox>
        </TodoBox>
      </div>
    </>
  )
}

export default TodoComponent
