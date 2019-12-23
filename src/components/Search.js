import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import DisplayMovies from './DisplayMovies';

const Search = (props) => {
    const [title, setTitle] = useState(props.match.params.title);
    const [movieData, setMovieData] = useState([]);
    const subtitle = title.replace("+", " ");

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
        return props.history.push({ pathname: `/search/movie/title=${title}` });
    }

    return (
        <main>
            <div className="d-flex align-items-baseline pt-3">
                <h5>Search > {subtitle}</h5>
                <section className="d-flex justify-content-end ml-auto">
                    <SearchBar handleSearchBar={handleSearchBar} />
                </section>
            </div>
            <hr />
            <section>
                <DisplayMovies movieData={movieData} />
            </section>
        </main>
    );
}
export default Search;