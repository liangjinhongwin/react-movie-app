import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../images/not-found.png';

const DisplayMovies = (props) => {
    const movies = props.movieData.map((movie, i) =>
        <div className="col pb-3" key={i}>
            <div className="card h-100">
                {(movie.poster_path) ?
                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="poster" /> :
                    <img className="card-img-top" src={placeholder} alt="poster" />}
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                        <h2 className="mr-2"><span className="badge badge-success">{movie.vote_average * 10}<small className="font-weight-light">%</small></span></h2>
                        <div className="w-75">
                            <h6 className="card-title m-0">{movie.title}</h6>
                            <small className="text-muted m-0">{movie.release_date}</small>
                        </div>
                    </div>
                    <div className="card-text text-nowrap overflow-auto">{movie.overview}</div>
                </div>
                <div className="card-footer d-flex justify-content-center">
                    <Link to={{ pathname: `/movie/id=${movie.id}`, state: movie }}><button className="btn btn-outline-info btn-sm">More Info</button></Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {movies}
        </div>
    );
}

export default DisplayMovies;