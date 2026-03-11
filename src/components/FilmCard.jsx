export default function FilmCard({ item }){
    const {Title, Poster, Year} = item
    return(
        <article className="film-card">
            <img src={Poster} alt={Title} />
            <section className="card-overlay">
                <h3 className="card-title">{Title}</h3>
                <p className="card-info">{Year}</p>
            </section>
        </article>
    )
}