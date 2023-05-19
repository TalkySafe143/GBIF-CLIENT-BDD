import Header from "./Header";

export default function Home() {
    return (
        <>
            <Header />
            <div className='homeContainer'>
                <h1>Bienvenido!</h1>
                <h3 style={{ marginTop: '50px' }}>Ingresa a los datos en la barra de navegacion que esta en la parte superior</h3>
            </div>
        </>
    )
}