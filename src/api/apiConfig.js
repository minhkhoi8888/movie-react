const apiConfig = {
    baseURL : "https://api.themoviedb.org/3/",
    apiKey : "45dc9d51f862b5fa1083d986cda3d9cc",
    originalImage : (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image : (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;