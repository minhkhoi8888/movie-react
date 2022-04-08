import axiosClient from "./axiosClient"

export const category = {
    movie: "movie",
    tv: "tv"
}

export const moviesType = {
    popular: "popular",
    upcoming: "upcoming",
    top_rated: "top_rated"
}

export const tvType = {
    popular: "popular", 
    top_rated: "top_rated",
    on_the_air: "on_the_air"
}

const apiMovies = {
    getMoviesList: (type, params) =>{
        const url = "movie/" + moviesType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) =>{
        const url = "tv/" + tvType[type];
        return axiosClient.get(url, params);
    },
    search: (cate, params) =>{
        const url = "search/" + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) =>{
        const url = category[cate] + "/" + id;
        return axiosClient.get(url, params);
    },
    getVideo: (cate, id) =>{
        const url = category[cate] + "/" + id + "/videos";
        return axiosClient.get(url, {params: {}});
    },
    credits: (cate, id) =>{
        const url = category[cate] + "/" + id + "/credits";
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) =>{
        const url = category[cate] + "/" + id + "/similar";
        return axiosClient.get(url, {params: {}});
    },
    review: (cate, id) =>{
        const url = category[cate] + "/" + id + "/reviews";
        return axiosClient.get(url, {params: {}});
    },
    externalIdTV: (id)=>{
        const url = "tv/" + id + "/external_ids";
        return axiosClient.get(url, {params: {}});
    }
}

export default apiMovies;