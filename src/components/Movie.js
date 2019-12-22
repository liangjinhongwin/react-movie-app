import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import placeholder from '../images/not-found.png';

const Movie = (props) => {
    const movie = props.location.state;
    const [liked, setLiked] = useState(false);
    const [rating, setRating] = useState("");

    useEffect(() => {
        const getMovie = (storageItem) => {
            if (!localStorage.getItem(storageItem)) {
                return;
            }

            let items = getStorage(storageItem);
            let item = items.find(item => item.movie.id === movie.id);
            if (!item) {
                return;
            }
            setLiked(item.liked);
            setRating(item.rating);
        }
        getMovie('movies');
    }, [movie.id])

    const handleSearchBar = (title) => {
        return props.history.push({ pathname: `/search/query=${title}` });
    }

    const handleCheck = (e) => {
        let liked = e.target.checked;
        setLiked(liked);
        let item = { movie: movie, liked: liked, rating: rating };
        if (!localStorage.getItem('movies')) {
            createStorage(item);
        }
        else {
            addToStorage(item);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let input = e.target.rating.value;
        if (rating === "" && input === "") {
            return;
        }

        setRating(input);
        let item = { movie: movie, liked: liked, rating: input };
        if (!localStorage.getItem('movies')) {
            createStorage(item);
        }
        else {
            addToStorage(item);
        }
        e.target.rating.value = "";
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
        }
        else {
            items.find(item => item.movie.id === newItem.movie.id).liked = newItem.liked;
            items.find(item => item.movie.id === newItem.movie.id).rating = newItem.rating;
        }
        items = JSON.stringify(items);
        localStorage.setItem('movies', items);
    }

    // Get Storage
    const getStorage = (storageItem) => {
        let items = localStorage.getItem(storageItem);
        items = JSON.parse(items);
        return items;
    }

    return (
        <main>
            <section className="d-flex justify-content-end pt-3">
                <SearchBar handleSearchBar={handleSearchBar} />
            </section>
            <hr />
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
                        <li className="list-group-item"><strong>Release</strong>: {movie.release_date}</li>
                        <li className="list-group-item"><strong>Rating</strong>: {movie.vote_average * 10}%</li>
                        {(liked === true) && <li className="list-group-item bg-warning"><strong>Your liked this movie!</strong></li>}
                        {(rating !== "") && <li className="list-group-item bg-warning"><strong>Your Rating</strong>: {rating}%</li>}
                        <li className="list-group-item">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-auto">
                                        <input className="d-none" id="checkbox-favourite" type="checkbox" checked={liked} onChange={handleCheck} />
                                        {(liked === true) ? <label className="btn btn-danger" htmlFor="checkbox-favourite">&#10006; Unlike</label> : <label className="btn btn-danger" htmlFor="checkbox-favourite">&hearts; Like</label>}
                                    </div>
                                    {(rating === "") ?
                                        <div className="col-auto">
                                            <input type="number" name="rating" min="0" max="100" placeholder="Rating" required />
                                            <button type="submit" className="btn btn-warning ml-1">&#10004; Rate</button>
                                        </div> :
                                        <div className="col-auto">
                                            <input type="number" className="d-none" name="rating" />
                                            <button type="submit" className="btn btn-warning">&#10006; Remove rating</button>
                                        </div>
                                    }
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default Movie;