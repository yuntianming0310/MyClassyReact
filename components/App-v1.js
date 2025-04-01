import { createEl } from '../lib/index.js'

class App {
  todos = []
  inputVal = ''

  constructor(root) {
    this.root = root
    this.render()
  }

  render() {
    this.root.replaceChildren(
      createEl('div', null, [
        createEl('div', null, [
          createEl('input', {
            dataset: {
              testid: 'input',
            },
            value: this.inputVal,
            onchange: e => {
              this.inputVal = e.target.value
            },
          }),
          createEl(
            'button',
            {
              dataset: { testid: 'add' },
              onclick: () => this.addTodo(),
            },
            'add'
          ),
        ]),
        createEl(
          'ul',
          null,
          this.todos.map(todo =>
            createEl('li', {}, [
              createEl('span', {}, todo),
              createEl(
                'button',
                {
                  onclick: () => this.removeTodo(todo),
                },
                'X'
              ),
            ])
          )
        ),
      ])
    )
  }

  addTodo() {
    if (!this.inputVal) return
    this.todos.push(this.inputVal)
    this.inputVal = ''
    this.render()
  }

  removeTodo(todo) {
    this.todos = this.todos.filter(item => item != todo)
    this.render()
  }
}
