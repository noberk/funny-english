import React from 'react'
import { Sophia } from './sophia'
import './App.css'
import 'antd/dist/antd.css'
import { Book } from './test/bookList'
import { Book2 } from './test/booklist2'

function App() {
  return (
    <div className="App">
      <Sophia />
      <Book />
      <Book2 />
    </div>
  )
}

export default App
