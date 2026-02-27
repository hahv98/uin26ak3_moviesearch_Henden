import { useState } from "react"

export default function Home(){
    const [search, setSearch] = useState()

    const baseUrl = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}` //${import.meta.env.API_KEY}
    //const apiKey = 'bcc5620f' <-- IGNORE --!>

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
        coonsole.log(e.target.value)
    }

    return(
        <main>
            <h1>Forside</h1>
            <form>
                <label htmlFor="filmsok" className="sok">
                    Søk etter film: <br/>
                    <input type="search" placeholder="Lord of the Rings"
                    onChange={handleChange} />
                </label>
            </form>
            <button onClick={getFilms}>Søk</button>
        </main>
    )
}