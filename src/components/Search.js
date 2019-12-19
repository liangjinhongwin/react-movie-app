import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import DisplayMovies from './DisplayMovies';

const Search = (props) => {
    const [title, setTitle] = useState(props.match.params.title);
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8f204ddbd3e76b6b335c89143c3f5dc&query=${title}`);
            let data = await res.json();
            setMovieData(data.results);
        }
        fetchResults();
    }, [title]);

    const handleSearchBar = (title) => {
        setTitle(title);
    }

    return (
        <main>
            <section className="d-flex justify-content-end my-2">
                <SearchBar handleSearchBar={handleSearchBar} />
            </section>
            <hr />
            <section>
                <DisplayMovies movieData={movieData} />
            </section>
        </main>
    );
}
export default Search;