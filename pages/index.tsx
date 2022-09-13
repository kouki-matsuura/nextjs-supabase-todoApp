import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import supabase from '../utils/supabase'
import { NewTodo } from '../components/NewTodo'
import { Data } from '../components/types/data.type' 

export default function Home() {
  const [todos, setTodos] = useState<Data[]>([])
  const fetchTodos = async () => {
    const { data } : any = await supabase.from('todos').select('*')
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className={styles.container}>
      <NewTodo reload={fetchTodos} />
      {todos.map ((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  )
}
