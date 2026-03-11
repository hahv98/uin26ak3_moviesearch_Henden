import { useEffect, useState } from "react"
import History from '../components/History'
import FilmCard from '../components/FilmCard'

export default function Home(){
    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)
    
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    console.log("denne kommer fra storage", storedHistory)

    const [film, setFilm] = useState([])
    const [load, setLoad] = useState(true)

    const baseUrl = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}` 

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(history))
    },[history])

    const getFilms = async()=>{
        try{
            const response = await fetch(`${baseUrl}&s=${search}`)
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        const fetchFilm = async()=>{
            try{
                const response = await fetch(`${baseUrl}&s=James+Bond`)
                const data = await response.json()

               if(data.Search){
                setFilm(data.Search)
                }
            }
            catch(err){
                console.error(err)
            }finally{
                    setLoad(false)
            }
        }
         fetchFilm()
    },[])
    if(load) return <p>Laster...</p>

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        e.target.reset()
        
        if(!search) return
        setHistory((prev) => [...prev, search])
    }
    console.log(history)

    return(
        <main>
            <h1>Forside</h1>
            <section className="form-in">
                <form onSubmit={handleSubmit} className="sok">
                    <label htmlFor="filmsok">
                        Søk etter film:
                        <input type="search" placeholder="Lord of the Rings"
                        onChange={handleChange} onFocus={()=>setFocused(true)} /* onBlur={()=>setFocused(false)} */ />
                    </label>
                    { focused ? <History history={history} setSearch={setSearch} /> : null }
                    <button onClick={getFilms}>🔍︎ Søk</button>
                </form>
            </section>
            <section className="movie-list">
                {film?.map((item) => (<FilmCard key={item.imdbID} film={item} />))} 
            </section>
        </main>
    )
}