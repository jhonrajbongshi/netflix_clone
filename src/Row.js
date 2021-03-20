import React,{useEffect, useState} from 'react';
import axios from "./axios"
import  "./Row.css"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"
const base_url = "https://image.tmdb.org/t/p/original/"

function Row( {title, fetchUrl,isLargeRow} ){
    const [movies,setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl]= useState("");
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            console.log(request.data.results)
            setMovies(request.data.results);
            
            return request;
        }
        fetchData();
        
    },[fetchUrl]);

    const opts ={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        }
    }
    console.log(movies)
const handleClick = (movie) =>{
    if(trailerUrl){
        setTrailerUrl('');
    }
    else{
        movieTrailer(movie.name || "")
        .then(url=>{
            // const urlParams = new URLSearchParams(new URL(url).search)// movie trailer package is not working properly
            console.log(url)
            setTrailerUrl("https://www.youtube.com/watch?v=TAWBj3mXM5w");// youtube video is not played properly its getting played back error
        })
        .catch((error)=> console.log(error))
    }
}

    return(
        <div className="row">
            <h2 className="row_title">{title}</h2>
            {/*title*/}
            <div className="row_posters">
            {/*container*/}
            {movies.map(movie=>{
               return( 
                <img
                key= {movie.id} 
                onClick={()=>handleClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                alt={movie.name} />
                )

            })}
            </div>
            {trailerUrl  && <YouTube videoId={trailerUrl} opts={opts}  />};
        </div>
    )
}

export default Row;
