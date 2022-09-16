import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import StyledNewTodoForm from '../components/molecules/NewTodoForm'
import { Data } from '../components/types/data.type' 
import { useQuery } from '@tanstack/react-query'
import Header from '../components/atoms/Header'
import ListArea from '../components/atoms/ListArea'
import { useGetTodo } from '../features/Hooks/useGetTodo'

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <StyledNewTodoForm />
      <ListArea />
    </div>
  )
}

export default Home;
