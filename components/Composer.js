import { Component } from '../lib/index.js'
import { createEl } from '../lib/myDOM.js'

export default class Composer extends Component {
  inputVal = ''

  constructor(props) {
    super(props)
  }

  render() {
    return createEl('div', {
      children: [
        createEl('input', {
          value: this.inputVal,
          onchange: e => {
            this.inputVal = e.target.value
          },
        }),
        createEl('button', {
          children: 'add',
          onclick: () => {
            if (!this.inputVal) return

            this.props.addTodo({
              id: Math.floor(Date.now() * Math.random()),
              value: this.inputVal,
            })
            this.inputVal = ''
            this.reRender()
          },
        }),
      ],
    })
  }
}
