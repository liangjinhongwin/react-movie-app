import React, { useState, useEffect } from 'react';
import DisplayMovies from './DisplayMovies';
import SearchBar from './SearchBar';

// Base URL: https://api.themoviedb.org/3/movie/
// API Key: e8f204ddbd3e76b6b335c89143c3f5dc
// https://api.themoviedb.org/3/movie/popular?api_key=e8f204ddbd3e76b6b335c89143c3f5dc

const Home = (props) => {
    const [display, setDisplay] = useState("popular");
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${display}?api_key=e8f204ddbd3e76b6b335c89143c3f5dc&region=US`);
            let data = await res.json();
            setMovieData(data.results.slice(0, 12));
        }
        fetchMovies();
    }, [display]);

    const dropDownDisplayMenu = () => {
        let array = [
            { name: "Popular", value: "popular" },
            { name: "Top Rated", value: "top_rated" },
            { name: "Now Playing", value: "now_playing" },
            { name: "Upcoming", value: "upcoming" }
        ];
        const displays = array.map((display, i) =>
            <option key={i} value={display.value}>{display.name}</option>);
        return displays;
    }

    const handleChangeDisplay = (e) => {
        setDisplay(e.target.value);
        setMovieData(movieData);
    }

    const handleSearchBar = (title) => {
        return props.history.push({ pathname: `/search/movie/title=${title}` });
    }

    return (
        <main>
            <section className="d-flex flex-wrap justify-content-between pt-3">
                <select onChange={handleChangeDisplay}>
                    {dropDownDisplayMenu()}
                </select>
                <SearchBar handleSearchBar={handleSearchBar} />
            </section>
            <hr />
            <section>
                <DisplayMovies movieData={movieData} />
            </section>
        </main>
    );
}

export default Home;