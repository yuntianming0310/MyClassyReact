# My Simple Classy React

> Special thanks to [JSer](https://jser.dev), thanks to his DDIR series course I got learned more inner details about React.
> This picture below shows some of my thoughts on the composition of React.
> The text content below the picture also describes some low-level core concepts that build my simple React,
> But words are not as straightforward as pictures, so I mainly draw the subsequent ideas in the pictures.

![Diagram of The Entire Architecture](./MyClassyReactArchitecture.png)

## Create a TodoList With Class

A basic approach, so don't worry too much about the details.

## Building a Function to Create an Element

> There are many calls of `document.createElement` in the code, which makes it look messy, so I extrac this logic into a separate function called `createEl`.
> This function accepts three parameters: `tag`, `attrs` and `children`.

1. First, create an element using `document.createElement(tag)` and store it in a variable called `el`.
2. Next, if attrs exists, add the attribute to `el`.

- Loop through attrs using `Object.entries(attrs).map(([key, value]) => {...})`
  - If the `key` starts with 'on', assign it to `el`.
  - If the `key` is 'dataset', use `Object.assign` to merge the value with the `dataset` property, because the value is an object.
  - Otherwise, use the `setAttribute()` method to set the attribute on `el`.

3. The final step is to append the children to `el`.

- If `children` is an array, call `append(...children)`
- Otherwise, if children exists, append as well.

4. Finally, return `el`.

```js
function createEl(tag, attrs, children) {
  const el = document.createElement(tag)

  if (attrs) {
    Object.entries(attrs).map(([key, value]) => {
      if (key.startsWith('on')) {
        el[key] = value
      } else if (key === 'dataset') {
        Object.assign(el.dataset, value)
      } else {
        el.setAttribute(key, value)
      }
    })
  }

  if (Array.isArray(children)) {
    el.append(...children)
  } else if (children) {
    el.append(children)
  }

  return el
}
```

## Separate Data Layer And View Layer

- How to reflect data changes in the view layer?
  - In React, the core concept is to re-render everything. In this approach, I just re-render the component after every data operation by calling the render function, regardless of what the operation does.
  - However, this approach is very expensive, which raises an important question:
- How to prevent unnecessary re-renders?
  - React uses the Fiber Architecture to optimize rendering performance by comparing the previous and current props to decide whether to re-render.

---

> Code

```js
// App
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
```

```js
// createEl
function createEl(tag, attrs, children) {
  const el = document.createElement(tag)

  if (attrs) {
    Object.entries(attrs).map(([key, value]) => {
      if (key.startsWith('on')) {
        el[key] = value
      } else if (key === 'dataset') {
        Object.assign(el.dataset, value)
      } else {
        el.setAttribute(key, value)
      }
    })
  }

  if (Array.isArray(children)) {
    el.append(...children)
  } else if (children) {
    el.append(children)
  }

  return el
}
```

### Separate Child Component

> These code look so messy, and we want to get the component that can do it own job.

---

Check out more code details in components and lib folder, also `index.js`.

Check out more ideas in the `MyClassyReactArchitecture.png`

---
