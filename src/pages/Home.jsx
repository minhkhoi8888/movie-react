import HeroSlide from "../components/heroSlide/HeroSlide";
import Button from "../components/button/Button";
import { Link } from "react-router-dom";
import MovieList from "../components/movieList/MovieList";
import { category, tvType, moviesType} from "../api/apiMovies";
import "./page.scss";

const Home = () => {
    return (
        <>
            <HeroSlide/>
            <div className="container layerContent">
                <div className="mb-4">
                    <div className="section-header mb-1">
                        <h2>Trending Movie</h2>
                        <Link to="/movie"><Button className="circle circle-load"><i className="bi bi-arrow-right"/></Button></Link>
                    </div>
                    <MovieList category={category.movie} type={moviesType.popular} />
                </div>

                <div className="mb-4">
                    <div className="section-header mb-1">
                        <h2>Top Rated Movie</h2>
                        <Link to="/movie"><Button className="circle circle-load"><i className="bi bi-arrow-right"/></Button></Link>
                    </div>
                    <MovieList category={category.movie} type={moviesType.top_rated} />
                </div>

                <div className="mb-4">
                    <div className="section-header mb-1">
                        <h2>Trending TV Shows</h2>
                        <Link to="/tv"><Button className="circle circle-load"><i className="bi bi-arrow-right"/></Button></Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>

                <div className="mb-4">
                    <div className="section-header mb-1">
                        <h2>Top Rated TV Shows</h2>
                        <Link to="/tv"><Button className="circle circle-load"><i className="bi bi-arrow-right"/></Button></Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </>
    )
}

export default Home;