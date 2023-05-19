import  '../styles/Header.css'
import {Navigate} from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>
                <h1><a href={'/home'}>GBIF</a></h1>
                <button id="abrir" className="abrir-menu"><i className="bi bi-list" onClick={e => {
                    const nav = document.querySelector("#nav");
                    //@ts-ignore
                    nav.classList.add("visible");
                }}></i></button>
                <nav className="nav" id="nav">
                    <button className="cerrar-menu" id="cerrar"><i className="bi bi-x" onClick={e => {
                        const nav = document.querySelector("#nav");
                        //@ts-ignore
                        nav.classList.remove("visible");
                    }}></i></button>
                    <ul className="nav-list">
                        <li><a href="/observation">Observation</a></li>
                        <li><a href="/media_details">Media Details</a></li>
                        <li><a href="/media">Media</a></li>
                        <li><a href="/deployment">Deployment</a></li>
                        <li><a href="/location">Location</a></li>
                        <li><a href="/camera_details">Camera Details</a></li>
                        <li><a href="/organism_details">Organism Details</a></li>
                        <li><a href="/taxon_details">Taxon Details</a></li>
                        <li><a href="/identification_details">Identification Details</a></li>
                        <li><a href="/queries">Consultas Propuestas</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}