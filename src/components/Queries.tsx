import Header from './Header'
import appStyles from "../styles/App.module.css";
import React, {useState} from "react";
import axios, {AxiosError} from "axios";

export default function Queries(){

    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [fourth, setFourth] = useState('');
    const [sended, setSended] = useState(false);

    //@ts-ignore
    async function sendQuery(e) {
        e.preventDefault();

        let query;

        if (first.length > 1) {
            query = `SELECT o.observationid, o.observationtype, o.classificationtimestamp, o.count, d.habitat FROM observation o INNER JOIN taxon_details t ON o.taxon_details_taxonkey = t.taxonkey INNER JOIN deployment d ON o.deployment_installationkey = d.installationkey WHERE t.scientificname = '${first}'`
        } else if (second.length > 1) {
            query = `SELECT md.filename FROM media_details md INNER JOIN observation o ON md.identifier = o.media_details_identifier WHERE ( ('${second}' = 'Llegada de nueva especie' AND o.observationtype = 'animal' AND o.count = 1) OR ('${second}' = 'Interaccion de diferentes especies' AND o.observationtype IN ('animal') AND o.count > 1))`
        } else if (third.length > 1) {
            query = `SELECT md.filename FROM media_details md INNER JOIN observation o ON o.media_details_identifier = md.identifier INNER JOIN deployment d ON o.deployment_installationkey = d.installationkey WHERE d.location_locationid = '${third}'`
        } else if (fourth.length > 1) {
            const fecha = fourth.split("-");
            query = `SELECT md.filename FROM observation o INNER JOIN media m ON o.media_mediaid = m.mediaid AND o.secuenceid = m.secuenceid INNER JOIN media_details md ON m.media_details_identifier = md.identifier WHERE m.timestamp = TO_DATE('${fecha[1]}/${fecha[2]}/${fecha[0]}', 'MM/DD/YYYY')`
        }

        try {
            console.log(query);
            const res = await axios.put(`http://localhost:3000/api/cameraDB/showQueries`,{
                query
            },{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
            });
            const apiRes = await res.data
            setSended(true);
            console.log(apiRes)
            // @ts-ignore
        } catch (e: AxiosError) {
            console.log(e.response.data.error.message)
            setSended(true);
        }
    }

    return (
        <>
            <Header />
            <div className="overQueries">
                <div className='homeContainer'>
                    <h1 className='queryTitle'>Buscar especies por su nombre</h1>
                    <label htmlFor="" className='queryLabel'>Nombre de la especie</label>
                    <input type="text" required={true} className='queryInput' onChange={e => {setFirst(e.target.value)}} value={first}/>
                    <button className='queryButton' onClick={sendQuery}>
                        <h4>Consultar</h4>
                    </button>
                </div>
                <div className='homeContainer'>
                    <h1 className='queryTitle'>Encontrar archivos por tipo de evento</h1>
                    <label htmlFor="" className='queryLabel'>Nombre del evento</label>
                    <input type="text" required={true} className='queryInput' onChange={e => {setSecond(e.target.value)}} value={second}/>
                    <button className='queryButton' onClick={sendQuery}>
                        <h4>Consultar</h4>
                    </button>
                </div>
                <div className='homeContainer'>
                    <h1 className='queryTitle'>Encontrar archivos por ubicacion</h1>
                    <label htmlFor="" className='queryLabel'>Id de la ubicacion</label>
                    <input type="text" required={true} className='queryInput' onChange={e => {setThird(e.target.value)}} value={third}/>
                    <button className='queryButton' onClick={sendQuery}>
                        <h4>Consultar</h4>
                    </button>
                </div>
                <div className='homeContainer'>
                    <h1 className='queryTitle'>Encontrar archivos por dia</h1>
                    <label htmlFor="" className='queryLabel'>Dia</label>
                    <input type="date" required={true} className='queryInput' onChange={e => {setFourth(e.target.value)}} value={fourth}/>
                    <button className='queryButton' onClick={sendQuery}>
                        <h4>Consultar</h4>
                    </button>
                </div>
            </div>
            {
                sended ? <h1>Puedes ver el resultado en tu consola</h1> : ""
            }
        </>
    )
}