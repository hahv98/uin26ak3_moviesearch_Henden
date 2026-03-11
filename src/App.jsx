import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Movie from './pages/Movie'

function App() {
  
  // const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=bcc5620f'

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":movie" element={<Movie />} />
    </Routes>
  )
}

export default App

/* 
Link til inspirasjon for design(CSS): 
https://www.youtube.com/watch?v=hOEnZDU1M9Q&t=2548s
*/