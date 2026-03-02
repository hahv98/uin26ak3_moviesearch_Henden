import { useEffect, useState } from "react"
import History from '../components/History'

export default function Home(){
    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    const [focused, setFocused] = useState(false)
    
    console.log("denne kommer fra storage", storedHistory)

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

    const handleChange = (e)=>{
        setSearch(e.target.value)
        //console.log(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        e.target.reset()
        
        setHistory((prev) => [...prev, search])
    }
    console.log(history)

    return(
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit} className="sok">
                <label htmlFor="filmsok">
                    Søk etter film:
                    <input type="search" placeholder="Lord of the Rings"
                    onChange={handleChange} onFocus={()=>setFocused(true)} /* onBlur={()=>setFocused(false)} */ />
                </label>
                { focused ? <History history={history} setSearch={setSearch} /> : null }
                <button onClick={getFilms}>🔍︎ Søk</button>
            </form>
        </main>
    )
}