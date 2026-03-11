export default function History({history, setSearch}){
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }
   return(
        <select onChange={handleChange} className="historikk hidden">
            {history?.map((item, i) => <option className="historikk-valg" key={i} value={item}>⟲ {item}</option>)}
        </select>
    )
}