import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import DisplayMovies from './DisplayMovies';

const Favourites = (props) => {
    const [movieData, setMovieData] = useState([]);

    const handleSearchBar = (title) => {
        return props.history.push({ pathname: `/search/query=${title}` });
    }
    
    useEffect(() => {
        const getStorage = (storageItem) => {
            let items = localStorage.getItem(storageItem);
            let movies = [];
            if (!items) {
                return;
            }
            
            items = JSON.parse(items);
            items.forEach(item => {
                if (item.liked === true) {
                    movies.push(item.movie);
                }
            });
            setMovieData(movies);
        }
        getStorage('movies');
    }, [])

    return (
        <main>
            <section className="d-flex justify-content-end my-2">
                <SearchBar handleSearchBar={handleSearchBar} />
            </section>
            <section>
                {(movieData.length > 0) ? <DisplayMovies movieData={movieData} /> : <h4 className="text-center">Sorry you have no favourited movies. Search for a movie to add to your favourites.</h4>}
            </section>
        </main>
    );
};

export default Favourites;