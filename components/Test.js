import { Component } from '../lib/index.js'
import { createEl } from '../lib/myDOM.js'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.images = [
      'https://images.unsplash.com/photo-1743020006589-731079b61c1b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1743020006589-731079b61c1b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1743020006589-731079b61c1b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ]
  }

  render() {
    return createEl('div', {
      children: this.images.map(item => createEl('img', { src: item })),
    })
  }
}
