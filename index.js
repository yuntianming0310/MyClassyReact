import { createRoot } from './lib/index.js'
import { createEl } from './lib/myDOM.js'

import TodoApp from './components/TodoApp.js'
// import Test from './components/Test.js'

const root = createRoot(document.getElementById('root'))
root.render(createEl(TodoApp))
