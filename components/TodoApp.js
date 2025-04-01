import { Component } from '../lib/index.js'
import { createEl } from '../lib/myDOM.js'

import Composer from './Composer.js'
import TodoList from './TodoList.js'

export default class TodoApp extends Component {
  todos = [{ id: 1, value: 'todo' }]

  addTodo(todo) {
    this.todos.push(todo)
    this.reRender()
  }

  removeTodo(todo, index) {
    if (index) {
      this.todos.splice(index, 1)
    } else {
      this.todos.splice(
        this.todos.findIndex(item => item.value === todo),
        1
      )
    }
    this.reRender()
  }

  render() {
    return createEl('div', {
      children: [
        createEl(Composer, {
          addTodo: this.addTodo.bind(this),
        }),
        createEl(TodoList, {
          todos: this.todos,
          removeTodo: this.removeTodo.bind(this),
        }),
      ],
    })
  }
}
