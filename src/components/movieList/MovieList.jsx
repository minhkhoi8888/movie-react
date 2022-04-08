import { useState, useEffect } from "react";
import apiMovies, {category} from "../../api/apiMovies";
import {Swiper, SwiperSlide} from "swiper/react";
import MovieCard from "../movieCard/MovieCard";
import "./MovieList.scss";
import 'swiper/components/pagination/pagination.scss';
import SwiperCore, { Pagination } from "swiper";

const MovieList = (props)=>{
    SwiperCore.use([Pagination]);

    const [movieList, setMovieList] =  useState([]);

    useEffect(()=>{
        const getList = async ()=>{
            let response = null;
            const params = {};

            if(props.type !== "similar"){
                switch (props.category) {
                    case category.movie: 
                        response = await apiMovies.getMoviesList(props.type, {params});
                        break;
                    default: 
                        response = await apiMovies.getTvList(props.type, {params});
                }
            } else {
                response = await apiMovies.similar(props.category, props.id);
            }
            setMovieList(response.results);
        }
        getList();
    }, [props.category, props.id, props.type]);
    

    return(
        <div className="movie-list">
            <Swiper
                modules={[Pagination]}
                grabCursor={true}
                slidesPerView={"auto"}
                spaceBetween={10} 
                pagination={{
                    type: "progressbar",
                  }}   
            >   
                {
                    movieList.map((item, index)=>(
                        <SwiperSlide key={index}>
                            <MovieCard category={props.category} item={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
        
};

export default MovieList;