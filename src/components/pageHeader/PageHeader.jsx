import "./PageHeader.scss";
import { useState, useEffect } from "react";
import apiMovies, {category, moviesType, tvType} from "../../api/apiMovies";
import apiConfig from "../../api/apiConfig";
import MediaQuery from "react-responsive";
import bg from "../../asset/footer.jpg"


const PageHeader = (props)=>{
    const cate = props.category; 
    const [items, setItems] = useState([]);
    useEffect(()=>{
        const getItems = async ()=>{
            try{
                let res = null;
                if(cate === category.movie){
                    res = await apiMovies.getMoviesList(moviesType.popular, {params: {}});
                } else if(cate === category.tv){
                    res = await apiMovies.getTvList(tvType.on_the_air, {params: {}});
                }
                setItems(res.results.slice(0,4));
            } catch(error){
                throw error;
            }
        }
        getItems();
    },[cate]);
    return (
        <>
        <MediaQuery maxWidth={680}>
            <div className="page-header-mobile" style={{backgroundImage: `url(${bg})`}}>
                <h2>{cate === category.movie ? 'Movies' : 'TV Series'}</h2>
            </div>
        </MediaQuery>
        <MediaQuery minWidth={681}>
            <div className="page-header container">
                {items.map((item, index)=>(
                    <div 
                        className="page-header__item" 
                        key={index}
                        style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || items.poster_path)})`}}
                    >
                        <h2>{item.title || item.name}</h2>
                    </div>
                ))}
            </div>
        </MediaQuery>
        </>
    )

}

export default PageHeader;