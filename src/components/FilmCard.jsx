export default function FilmCard({ item }){
    const {Title, Poster, Year} = item
    return(
        <article className="film-card">
            <img src={Poster} alt={Title} />
            <h3>{Title}</h3>
            <p>Year: {Year}</p>
        </article>
    )
}