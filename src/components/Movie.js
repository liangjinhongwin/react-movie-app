import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import placeholder from '../images/not-found.png';

const Movie = (props) => {
    const movie = props.location.state;
    const [liked, setLiked] = useState(false);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const getStorage = (storageItem) => {
            let items = localStorage.getItem(storageItem);
            if (!items) {
                return;
            }

            items = JSON.parse(items);
            let item = findMovie(storageItem);
            if (!item) {
                return;
            }
            setLiked(item.liked);
            setRating(item.rating);
        }
        getStorage('movies');
    }, [])

    const handleSearchBar = (title) => {
        return props.history.push({ pathname: `/search/query=${title}` });
    }

    const handleCheck = (e) => {
        setLiked(e.target.checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let rating = e.target.rating.value;
        setRating(rating);
        let item = { movie: movie, liked: liked, rating: rating };
        if (!localStorage.getItem('movies')) {
            createStorage(item);
            alert(`Movie ${item.movie.id} added.`);
        }
        else {
            addToStorage(item);
        }
    }

    // Create Storage
    const createStorage = (initialItem) => {
        let items = [initialItem]
        items = JSON.stringify(items);
        localStorage.setItem('movies', items);
    }

    // Add to Storage
    const addToStorage = (newItem) => {
        let items = localStorage.getItem('movies');
        items = JSON.parse(items);
        if (!items.find(item => item.movie.id === newItem.movie.id)) {
            items.push(newItem)
            alert(`Movie ${newItem.movie.id} added.`);
        }
        else {
            items.find(item => item.movie.id === newItem.movie.id).liked = newItem.liked;
            items.find(item => item.movie.id === newItem.movie.id).rating = newItem.rating;
            alert(`Movie ${newItem.movie.id} updated.`);
        }
        items = JSON.stringify(items);
        localStorage.setItem('movies', items);
    }

    // Get movie from Storage
    const findMovie = (storageItem) => {
        if (!localStorage.getItem(storageItem)) {
            return;
        }

        let items = localStorage.getItem(storageItem);
        items = JSON.parse(items);

        let item = items.find(item => item.movie.id === movie.id);
        if (!item) {
            return;
        }
        return item;
    }

    return (
        <main>
            <section className="d-flex justify-content-end my-2">
                <SearchBar handleSearchBar={handleSearchBar} />
            </section>
            <section>
                <figure className="d-flex justify-content-center">
                    {(movie.poster_path) ?
                        <img className="" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="poster" /> :
                        <img className="mx-auto" src={placeholder} alt="poster" />}
                </figure>
                <div className="info">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-info text-center"><strong>{movie.title}</strong></li>
                        <li className="list-group-item">{movie.overview}</li>
                        <li className="list-group-item">Release date: {movie.release_date}</li>
                        <li className="list-group-item">Rating: {movie.vote_average}</li>
                        {(liked === true) && <li className="list-group-item bg-warning"> Your liked this movie!</li>}
                        {(rating && rating !== "") && <li className="list-group-item bg-warning">Your Rating: {rating} (out of 10)</li>}
                    </ul>
                </div>
                <div className="card-footer">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row d-flex justify-content-around align-item-baseline">
                            <div className="col-auto">
                                <label htmlFor="checkbox-favourite">Favourite</label>
                                <input id="checkbox-favourite" type="checkbox" checked={liked} onChange={handleCheck} />
                            </div>
                            <div className="col-auto">
                                <label htmlFor="text-rating">Your Rating</label>
                                <input id="text-rating" type="number" name="rating" min="0" max="10" placeholder="rating" defaultValue={rating} />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Movie;