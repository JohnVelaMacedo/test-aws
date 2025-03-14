import { useEffect, useState } from 'react'

interface Todo {
  id: string
  name: string
}

// const URL = 'http://localhost:3000/task'
const URL =
  'https://wf7ukdsuyd676xkk7j4ozqk3my0xpqyv.lambda-url.sa-east-1.on.aws/task'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState('')

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetch(URL)
        const resp = await data.json()
        return resp
      } catch (error) {
        console.error(error)
      }
    }

    getTodos().then(console.log)
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTodo: Todo = {
      name: todo,
      id: crypto.randomUUID()
    }

    await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ name: todo })
    })
    setTodos((prev) => [...prev, newTodo])
    setTodo('')
  }

  const deleteTodo = async (id: string) => {
    const updatedTodo = todos.filter((t) => t.id !== id)
    setTodos(updatedTodo)
    await fetch(`${URL}/${id}`, {
      method: 'DELETE'
    })
  }

  return (
    <>
      <h1>TODO APP</h1>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='todo'
          id='todo'
          placeholder='Inserta accion'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <button>Enviar</button>
      </form>

      <ul>
        {todos?.map((t) => (
          <li
            key={t.id}
            onClick={() => deleteTodo(t.id)}
          >
            {t.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
