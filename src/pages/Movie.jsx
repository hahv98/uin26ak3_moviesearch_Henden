import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Movie(){
    const { imdbID } = useParams()
    const [movData, setMovData] = useState(null)
    const [load, setLoad] = useState(true)

    const baseUrl = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${imdbID}&plot=full`
    
    useEffect(()=>{ //useEffect for å hente valgt data på nytt, men ny URL som inneholder mer info om valgt film.
        const fetchFilmDetails = async()=>{
            try{
                const response = await fetch(baseUrl)
                const data = await response.json()
                setMovData(data)
            }catch(err){
                console.error(err)
            }finally{
                setLoad(false)
            }
        }
        fetchFilmDetails()
    },[imdbID])

    if(load) return <p>Laster detaljer...</p>
    if(!movData) return <p>Finner ingen filmdata.</p>

    const {Title, Poster, Year, Director, Genre, imdbRating, Plot, Actors} = movData
    
    return(
        <>
            <Navbar />
            <article className="movie-display">
                <section className="poster">
                    <img src={Poster} alt={Title} />
                </section>
                <section className="mov-txt">    
                    <h3 className="mov-title">{Title}</h3>
                    <ul className="mov-detail">
                        <li><strong>Released:</strong> {Year}</li>
                        <li><strong>Genre:</strong> {Genre}</li>
                        <li><strong>imDB:</strong> {imdbRating}</li>
                        <li><strong>Director:</strong> {Director}</li>
                        <li><strong>Actors:</strong> {Actors}</li>
                    </ul>
                    <p className="mov-info">{Plot}</p> 
                </section>
            </article>
        </>
    )
}