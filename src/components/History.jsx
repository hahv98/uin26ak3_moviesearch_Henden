export default function History({history, setSearch}){
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }
   return(
        <ul onChange={handleChange} className="dropdown"> {/* Endret fra select til ul, mer samarbeidsvillig liste */}
            {history?.map((item, i) => <li className="historikk-valg" key={i} onMouseDown={()=>{
                setSearch(item)
                getFilms()
            }}>{item}</li>)}
        </ul>
    )
}
/* Hjelp til endring av søkehistorikk: https://gemini.google.com/share/56bc5b5dd5ab */