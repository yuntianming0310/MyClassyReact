import TodoItem from './TodoItem.js'
import { Component } from '../lib/index.js'
import { createEl } from '../lib/myDOM.js'

export default class TodoList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return createEl('ul', {
      children:
        this.props.todos.length &&
        this.props.todos.map((todo, index) =>
          createEl(TodoItem, {
            key: todo.id,
            todo: todo.value,
            todoIndex: index,
            removeTodo: this.props.removeTodo,
          })
        ),
    })
  }
}
