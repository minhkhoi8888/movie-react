import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import "./MovieCard.scss";

const MovieCard = (props)=>{
    const item = props.item;
    const background = apiConfig.w500Image(item.poster_path);
    const date = (item)=>{
        const year = item.release_date ? item.release_date : item.first_air_date;
        if(year !== undefined){
            return year.slice(0,4);
        }
        return "?";
    }

    const link = "/"+ props.category + "/" + item.id;
    return(
        <Link to={link}>
            <div 
                className="movie-card"
                style={
                    {backgroundImage: `url(${background})`}
                }
            >
                <div className="title">
                    <p> {item.title || item.name} </p>
                    <span className="title__tag">
                        <span className="imdb">{item.vote_average} - IMDB</span>
                        <span className="release-date">{date(item)}</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard;