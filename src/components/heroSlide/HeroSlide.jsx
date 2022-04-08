import { useEffect, useState, useRef} from "react";
import "./HeroSlide.scss";
import { useNavigate } from "react-router-dom";

import Button from "../button/Button";

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'

import apiConfig from "../../api/apiConfig";
import apiMovies, {category, moviesType } from "../../api/apiMovies"
import YouTube from "react-youtube";
import MediaQuery from "react-responsive";

const HeroSlide = ()=>{
    return (
        <div 
            className="hero-main"
        >
            <MediaQuery minWidth={1300}>
                <HeroTrailer />
            </MediaQuery>
            <MediaQuery maxWidth={1299}>
                <HeroSlideItem />
            </MediaQuery>
            
        </div>
    )
}

const HeroTrailer = () =>{
    const [videoKey, setVideoKey] =  useState(null);
    const [random, setRandom] = useState({backdrop_path: "/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg"});
    const [mute, setMute] = useState(false);
    const trailerRef = useRef();

    
    useEffect(()=>{
        const getTrailer = async ()=>{
            try{
                const response = await apiMovies.getMoviesList(moviesType.popular, {params: {}});
                const array = response.results;
                const random = Math.floor(Math.random()*array.length);
                const randomVideo = array[random];
                const resVideo = await apiMovies.getVideo(category.movie, randomVideo.id);
                const trailer = resVideo.results.find(e => e.type === "Trailer");
                setVideoKey(trailer);
                setRandom(randomVideo);
            } catch(error) {
                throw error;
            }
        }
        getTrailer();
    },[]);

    const bg = apiConfig.originalImage(random.backdrop_path || random.poster_path);
    const opts = {
        height: "860",
        width: "100%",
        playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1
        }
    };
    const checkElapsedTime = (e) =>{
        const duration = e.target.getDuration();
        var currentTime = e.target.getCurrentTime();

        if(currentTime / duration > 0.95){
            setVideoKey(null);
        }
    }

    const checkReady = (e) =>{
        e.target.mute();
        e.target.setVolume(50);
        e.target.playVideo();
    }
    const changeVol = ()=>{
        if(mute){
            trailerRef.current.internalPlayer.mute();
            setMute(false);
        } else{
            trailerRef.current.internalPlayer.unMute();
            setMute(true);
        }
    }

    return (
        <div 
            className="hero-main__trailer"
            style={{
                backgroundImage: `url(${bg})`
            }}
        >
            {videoKey ?
            <YouTube
                ref={trailerRef}
                classname="video-trailer"
                opts={opts} 
                videoId={videoKey.key} 
                onReady={e=>checkReady(e)}
                onStateChange={e=>checkElapsedTime(e)}
            /> : null} 
            <HeroInfo info={random} changeVol={changeVol} mute={mute} videoKey={videoKey}/>
        </div>
    )
}

const HeroSlideItem = (props) =>{
    const [movieItems, setMovieItems] = useState([]);
    useEffect(()=>{
        const getItems = async ()=>{
            try{
                const response = await apiMovies.getMoviesList(moviesType.popular, {params: {}});
                setMovieItems(response.results.slice(0, 5));
            } catch(error) {
                throw error;
            }
        }
        getItems();
    },[]);
    SwiperCore.use([Autoplay]);
    
    return(
        <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{delay: 6000}}
        >
            {
                movieItems.map((item,index)=>(
                    <SwiperSlide key={index}>
                        {({isActive}) =>(
                            <div 
                                className={`hero-main__slider ${isActive ? "active" : ""}`}
                                style={{
                                    backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`
                                }}
                            >
                                <HeroInfo info={item}/>
                            </div> 
                        )} 
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

const HeroInfo = (props)=>{
    let navigate = useNavigate(); 
    const info = props.info;
    return (
    <>
        {info ? 
            (
                <div className="hero-main__info container">
                    <div className="title">{info.title}</div>
                    <div className="overview">{info.overview}</div>
                    <div className="btns">
                        <Button onClick={()=>navigate("/movie/" + info.id)}>
                            Watch Now
                        </Button>
                        <Button onClick={()=>navigate("/movie/" + info.id)} className="circle" >
                            <i className="bi bi-info-circle"></i>
                        </Button>

                        {props.videoKey ? 
                            ((
                            <Button className="mute circle" onClick={props.changeVol}>
                                {props.mute ? <i className="bi bi-volume-down"/> : <i className="bi bi-volume-mute"/>}
                            </Button>
                            )) : ""
                        }
                    </div>
                </div>
            ) : null
        }
    </>
    );
}

export default HeroSlide;