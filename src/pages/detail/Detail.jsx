import "./Detail.scss";
import apiMovies from "../../api/apiMovies" ;
import apiConfig from "../../api/apiConfig";
import Button from "../../components/button/Button";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {Swiper, SwiperSlide } from "swiper/react";
import MovieList from "../../components/movieList/MovieList";

const Detail = () => {
    const { category, id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(()=>{
        window.scrollTo(0,0);

        const getItem = async ()=>{
            const response = await apiMovies.detail(category, id, {params:{}});
            setItem(response);
        }
        getItem();
    },[category, id]);
    return (
        <>
            {item && (
                <>
                    {/* background */}
                    <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                    {/* info movie/tv */}
                    <div className="mb-3 movie-content container">
                        <div className="movie-content__poster">
                            <img src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} alt="" />
                            <div>
                                <Button className="trailer">Trailer</Button>
                                <Button className="add-fvt">Add Favourite</Button>
                            </div>
                            <Button className="watch">Watch Now</Button>
                            
                        </div>

                        <div className="movie-content__info">
                            <h2 className="title">
                                {item.title || item.name}
                                <div className="title__wrap">
                                    <div className="title__wrap__imdb">{item.vote_average} <i className="bi bi-star-fill"></i></div>
                                    <div className="title__wrap__runtime"><i className="bi bi-clock-fill"></i>{item.runtime ? item.runtime + " min" : item.episode_run_time + " min/ep"}</div>
                                </div>
                            </h2>
                            <GenresList category={category} item={item} />
                            
                            <p className="overview">{item.overview}</p>
                            <CastList item={item.id} category={category} />
                        </div>
                    </div>
                    {/* Player */}
                    <Player id = {item} category={category}/>
                    {/* review/comment */}
                    <div className="movie-side container mb-4">
                        <Review category={category} id={item.id} />
                        <RatingStar category={category} id={item.id} />
                    </div>
                    {/* list similar */}
                    <div className="container mb-4">
                        <h3>Similar</h3>
                        <MovieList category={category} id={item.id} type="similar"/>
                    </div>
                    
                </>
                )
            }
        </>
    )
}

const GenresList = (props) =>{
    useEffect(()=>{},[props.category, props.item])
    const item = props.item;
    return(
        <div className="genres">
            <Swiper
            grabCursor={true}
            slidesPerView={"auto"}
            spaceBetween={10}   
        >
            {
                item.genres && item.genres.slice(0,5).map((item, index)=>(
                    <SwiperSlide key={index} >
                        <Button className="small genre" key={index}>{item.name}</Button>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
    )
}

const CastList = (props) =>{
    const [actor, setActor] = useState([]);
    useEffect(()=>{
        const getActor = async ()=>{
            const res = await apiMovies.credits(props.category, props.item);
            setActor(res.cast.slice(0,10));
        };
        getActor();
    },[props.category, props.item])
    return(
        <div className="cast">
            <h3>Cast</h3>
            <Swiper
                grabCursor={true}
                slidesPerView={'auto'}
                spaceBetween={10}    
            >
                {
                    actor.map((item, index)=>(
                        <SwiperSlide key={index} >
                            <img className="actor-img" src={apiConfig.w500Image(item.profile_path)} alt="actor"/>
                            <p className="actor-name">{item.name}</p>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

const Review =  (props)=>{
    const [reviews, setReviews] = useState(null);

    useEffect(()=>{
        const getReview= async ()=>{
            const res = await apiMovies.review(props.category, props.id);
            setReviews(res.results.slice(0,4));
        }
        getReview();
    },[props.category, props.id]) 

    return(
        <div className="review">
            <h2>Review</h2>
            {
                reviews ? (
                    reviews.map((item , index)=>(
                        <div className="review__item" key={index}>
                            <h3>{item.author}</h3>
                            <div className="review__item__content">
                                <p>{item.content.slice(0, 255)}</p>
                            </div>
                        </div>
                    ))
                ) : (<p>No Review</p>)
            }
        </div>  
    )
}

const RatingStar = (props)=>{
    const [rating, setRating] = useState(0);
    const [hover, setHover] =  useState(0);

    useEffect(()=>{}, [props.category, props.id])

    return(
        <div className="rating">
            <h2 className="rating-title">Rate this Film?</h2>
            {
                [...Array(5)].map((item, index)=>{
                    const ratingValue = index + 1;
                    return(
                        <label key={index}> 
                            <input 
                                type="radio" 
                                name="rating"
                                value={ratingValue}
                                onClick={()=>{setRating(ratingValue)}}
                            />
                            <i 
                                className="bi bi-star-fill"
                                style={{color: ratingValue <= (hover || rating) ? "#ffd11a" : "#b3cccc"}}
                                onMouseEnter={()=>{setHover(ratingValue)}}
                                onMouseLeave={()=>{setHover(null)}}
                            ></i>
                        </label>
                    )
                })
            }
           {rating !== 0 ? (<p>Thanks! You rated {rating*2} </p>) : ""}
        </div>
   )
}

const Player = (props)=>{
    var [id, setId] = useState(props.id.id);
    useEffect(()=>{
        const getIdTV = async ()=>{
            const res = await apiMovies.externalIdTV(props.id.id);
            setId(res.imdb_id);
        }
        if (props.category === "tv"){
            getIdTV();
        }
    },[])

    let source;
    if (props.category === "tv"){
        source = `https://www.2embed.ru/embed/imdb/tv?id=${id}&s=1&e=1`;
    } else {
        source = `https://www.2embed.ru/embed/imdb/movie?id=${props.id.imdb_id}`;
    }
    return(
        <div className="player container">
            <iframe src={source} allowFullScreen width="100%" height="100%" frameBorder="0"></iframe>
        </div>
    )
}



export default Detail;
