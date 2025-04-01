import { Component } from '../lib/index.js'
import { createEl } from '../lib/myDOM.js'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return createEl('li', {
      children: [
        createEl('span', { children: this.props.todo }),
        createEl('button', {
          children: 'X',
          onclick: () =>
            this.props.removeTodo(this.props.todo, this.props.todoIndex),
        }),
      ],
    })
  }
}
