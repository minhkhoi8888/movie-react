import apiMovies, { category, moviesType, tvType } from "../../api/apiMovies";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieGrid.scss";
import MovieCard from "../movieCard/MovieCard";
import Button from "../button/Button";

const MovieGrid = (props)=>{   
    const [itemPage, setItemPage] =  useState([]);
    const [totalPage, setTotalPage]= useState(0);
    const [page, setPage]= useState(1);
    const { keyword } = useParams();

    useEffect(()=>{
        const getItem = async () =>{
            let response = null;

            if (keyword === undefined ){
                const params = {};
                switch (category.movie) {
                    case props.category:
                        response = await apiMovies.getMoviesList(moviesType.upcoming, {params});
                        break;
                    default:
                        response = await apiMovies.getTvList(tvType.popular, {params});
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await apiMovies.search(props.category, {params})
            }
            setItemPage(response.results);
            setTotalPage(response.total_pages);
        }
        getItem();
    },[props.category, keyword])

    const loadMore = async ()=>{
            let response = null;

            if (keyword === undefined ){
                const params = {page:  page + 1};
                switch (category.movie) {
                    case props.category:
                        response = await apiMovies.getMoviesList(moviesType.upcoming, {params});
                        break;
                    default:
                        response = await apiMovies.getTvList(tvType.popular, {params});
                }
            } else {
                const params = {
                    page:  page + 1,
                    query: keyword
                }
                response = await apiMovies.search(props.category, {params})
            }
            setItemPage([...itemPage, ...response.results]);
            setPage(page + 1);
    }

    return (
        <>
            {keyword ? (<p>results for {keyword}</p>) : null}
            <div className="movie-grid">
                {
                    itemPage.map((item, index)=> <MovieCard item={item} category={props.category} key={index} />)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__page">
                        <Button className="small" onClick={loadMore}>
                            Load more
                        </Button>
                    </div>
                ) : null
            }
        </>
    )

}

export default MovieGrid;