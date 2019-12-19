import React, { useState, useEffect } from 'react';
import DisplayMovies from './DisplayMovies';
import SearchBar from './SearchBar';

// Base URL: https://api.themoviedb.org/3/movie/
// API Key: e8f204ddbd3e76b6b335c89143c3f5dc
// https://api.themoviedb.org/3/movie/popular?api_key=e8f204ddbd3e76b6b335c89143c3f5dc&page=1

const Home = (props) => {
    const [display, setDisplay] = useState(props.display);
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${display}?api_key=e8f204ddbd3e76b6b335c89143c3f5dc&region=US&page=1`);
            let data = await res.json();
            setMovieData(data.results.slice(0, 12));
        }
        fetchMovies();
    }, [display]);

    const dropDownDisplayMenu = () => {
        let array = ["popular", "top_rated", "now_playing", "upcoming"];
        const displays = array.map((display, i) =>
            <option key={i} value={display}>{display}</option>);
        return displays;
    }

    const handleChangeDisplay = (e) => {
        e.preventDefault();

        let display = e.target.selectDisplays.value;
        setDisplay(display);
        setMovieData(movieData);
    }

    const handleSearchBar = (title) => {
        return props.history.push({ pathname: `/search/query=${title}` });
    }

    return (
        <main>
            <section className="d-flex justify-content-between align-items-baseline pt-3">
                <div>
                    <form onSubmit={handleChangeDisplay}>
                        <select name="selectDisplays">{dropDownDisplayMenu()}</select>
                        <button className="btn btn-primary ml-1" type="submit">&#10140;</button>
                    </form>
                </div>
                <SearchBar handleSearchBar={handleSearchBar} />
            </section>
            <hr />
            <section>
                <DisplayMovies movieData={movieData} />
            </section>
        </main>
    );
}

Home.defaultProps = {
    display: "popular"
}

export default Home;