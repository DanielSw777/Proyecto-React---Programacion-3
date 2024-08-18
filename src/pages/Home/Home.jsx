import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <>
            <main className="home__main">
                <div className="home__container-title">
                    <h1 className="home__title">Bienvenido a la Aplicación de Música</h1>
                </div>
                <section className="home__container-description">
                    <h2 className="home__container-sub">Descubre tu Música Favorita</h2>
                    <p className="home__description">Explora, escucha y comparte la música que más te gusta con nuestra aplicación.</p>
                    <Link to="/songs" className="home__button">Comienza Ahora</Link>
                </section>
            </main>
        </>
    );
};

export default Home;
