import React, { useEffect, useState, FC, ReactElement, ReactNode } from 'react'

interface FCC {
  children: ReactNode
}
type BookContextType = {
  name: string
} & typeof api
const Books = [
  {
    name: 'Tina',
    id: 1,
    age: 16,
  },
  {
    name: 'Iera',
    id: 2,
    age: 13,
  },
  {
    name: 'Linas',
    id: 3,
    age: 15,
  },
]
const api = {
  getTable() {
    return Promise.resolve<{ name: string; age: number }[]>([{ name: 'lee', age: 5 }])
  },
  getBooks() {
    return Promise.resolve(Books)
  },
  searchBook(id: number) {
    let found = Books.filter(p => +p.id === +id)
    return Promise.resolve(found)
  },
}

export const BookContext = React.createContext<Partial<BookContextType>>({})

function _(props: FCC) {
  let [state, setState] = useState<Partial<BookContextType>>({ name: 'lee', ...api })

  return <BookContext.Provider value={state}>{props.children}</BookContext.Provider>
}
export const BookContextProvider: FC = props => {
  return <_ {...props}>{props.children}</_>
}
