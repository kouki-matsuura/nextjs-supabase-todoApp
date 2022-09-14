import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { NewTodo } from '../atoms/NewTodo'
import { Data } from '../types/data.type' 
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const [todos, setTodos] = useState<Data[]>([]);

  const getTodo = async () => {
    const res = await fetch("http://localhost:3000/api/get").then(
      (response) => {
        return response.json()
      }
      
    );
    setTodos(res.toDo)
  }
  const { isLoading } = useQuery(['getTodos'], () => getTodo(), {
    refetchOnWindowFocus: false,
  }) 
  return (
    <div className={styles.container}>
      <NewTodo/>
      {todos.map ((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  )
}

export default Home;
