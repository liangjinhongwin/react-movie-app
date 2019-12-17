import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../images/not-found.png';

const DisplayMovies = (props) => {
    const movies = props.movieData.map((movie, i) =>
        <div className="col mb-3" key={i}>
            <div className="card h-100">
                {(movie.poster_path) ?
                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="poster" /> :
                    <img className="card-img-top" src={placeholder} alt="poster" />}
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text text-nowrap overflow-auto">{movie.overview}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Release date: {movie.release_date}</li>
                    <li className="list-group-item">Rating: {movie.vote_average}</li>
                </ul>
                <div className="card-footer d-flex justify-content-center">
                    <Link to={{ pathname: `/movie/id=${movie.id}`, state: movie }}><button className="btn btn-primary">More Info</button></Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {movies}
        </div>
    )
}

export default DisplayMovies;