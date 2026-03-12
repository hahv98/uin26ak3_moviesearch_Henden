import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <header>
            <Link to="/"><h1>Forside | OMDb API - The Open Movie Database</h1></Link>
        </header>
    )
}