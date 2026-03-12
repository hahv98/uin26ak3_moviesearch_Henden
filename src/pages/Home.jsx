import { useEffect, useState } from "react"
import History from '../components/History'
import FilmCard from '../components/FilmCard'
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

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
    },[history]) // hver gang history endres, oppdateres localStorage med den nye history-arrayen

    const getFilms = async()=>{
        if(!search) return

        try{
            setFilm([]) //Tømmer arrayet før nytt søk gjennomføres, forhindrer at noe data kan bli igjen ved neste søk.
            const response = await fetch(`${baseUrl}&s=${search}`)
            const data = await response.json()
            if(data.Search){
                setFilm(data.Search)
            }else{
                setFilm([])
            }
        }
        catch(err){
            console.error(err)
        }
    }

    /* UseEffect som kjøres når komponenten mountes, som gjør at den henter James Bond filmene ved oppstart av applikasjonen */
    useEffect(()=>{
        const startDisplay = async()=>{
            try{
                const response = await fetch(`${baseUrl}&s=James+Bond&type=movie`)
                const data = await response.json()

               if(data.Search){
                setFilm(data.Search)
                }
            }
            catch(err){
                console.error(err)
            }finally{
                    setLoad(false) // uansett om det feiler eller ikke, så settes load til false etter at fetch er ferdig
            }
        }
         startDisplay()
    },[])
    if(load) return <p>Laster...</p> // hvis loading tar lengre tid, vil denne teksten vises

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const minLength = 3 
    const handleSubmit = (e)=>{
        e.preventDefault() // forhindrer at siden refresher ved submit
        setFocused(false)
        
        if(!search || search.trim().length < minLength) return 
        /* hvis search er tom, gjør ingenting (forhindrer at tomme søk legges til i history)
        Forhindrer også søket i å bli gjennomført før minLength på 3 tegn er oppnådd */
        if(search && !history.includes(search)){
            setHistory((prev) => [...prev, search])
        }
        getFilms()
        e.target.reset() // tømmer inputfeltet etter submit
    }
    console.log(history)

    return(
        <main>
            <section className="form-in">
                <Navbar />
                <form onSubmit={handleSubmit} className="sok">
                    <label htmlFor="filmsok">Søk etter film:</label>
                    <section className="sok-in">
                        <input 
                            type="search" 
                            placeholder="James Bond" 
                            id="sokefelt" 
                            value={search || ''}
                            onChange={handleChange} 
                            onFocus={()=>setFocused(true)} 
                            onBlur={()=> setTimeout(()=>setFocused(false), 200)} 
                            required
                        />
                        {focused ? <History history={history} setSearch={setSearch} /> : null}
                        {/* { focused ? <History history={history} setSearch={setSearch} /> : null } */}
                    </section>
                    <button type="submit">🔍︎ Søk</button> 
                    {/* Fjernet onClick, siden jeg puttet button inne i form, så kjøres handleSubmit istedenfor */}
                </form>
            </section>
            <section className="movie-list">
                {/* mapper ut filmene i søk-arrayet, hvert søk returnerer max 10, så displayet er 10 */}
                {film?.map((item) => (<Link key={item.imdbID} to={`/${item.imdbID}`}><FilmCard item={item} /></Link>))} 
            </section>
        </main>
    )
}

/* 
Link til Gemini-samtale der jeg hentet inspirasjon til å løse James Bond ved oppstart av applikasjonen:
https://gemini.google.com/share/190a8b37b916

Link til Gemini-samtale der jeg spurte om hjelp til søke-funskjon:
https://gemini.google.com/share/c22fec3b27e1

Link til Gemini-samtale for hjelp av funksjonalitet og design av søkefelt og historikk:
https://gemini.google.com/share/56bc5b5dd5ab
*/