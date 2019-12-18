import React, { useState, useEffect } from 'react';
import DisplayMovies from './DisplayMovies';

const Discover = (props) => {
    const [releaseYear, setReleaseYear] = useState(props.releaseYear);
    const [genres, setGenres] = useState(props.genres);
    const [sorter, setSorter] = useState(props.sorter);
    const [genreList, setGenreList] = useState([]);
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const fetchGenreList = async () => {
            const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=e8f204ddbd3e76b6b335c89143c3f5dc');
            let data = await res.json();
            data.genres.forEach(genre => genre.checked = false);
            setGenreList(data.genres);
        }
        fetchGenreList();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8f204ddbd3e76b6b335c89143c3f5dc&year=${releaseYear}&with_genres=${genres}&sort_by=${sorter}&region=US&page=1`);
            let data = await res.json();
            setMovieData(data.results.slice(0, 12));
        }
        fetchMovies();
    }, [releaseYear, genres, sorter]);

    const dropDownSorterMenu = () => {
        let array = ["vote_average.desc", "vote_average.asc", "release_date.asc", "release_date.desc", "original_title.desc", "original_title.asc"];
        const sorters = array.map((sorter, i) =>
            <option key={i} value={sorter}>{sorter}</option>
        );
        return sorters;
    }

    const checkBoxGenreMenu = () => {
        const list = genreList.map((genre, i) =>
            <span className="dropdown-item" key={i}>
                <input id={genre.name} type="checkbox" name={genre.id} onChange={handleCheck} />
                <label htmlFor={genre.name} className="mr-2">{genre.name}</label>
            </span>);
        return list;
    }

    const handleCheck = (e) => {
        let newList = genreList;
        newList.find(genre => genre.id === Number(e.target.name)).checked= e.target.checked;
        setGenreList(newList);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let year = Number(e.target.year.value);
        let sort = e.target.selectSorters.value;
        let genresString = "";

        if (year) {
            setReleaseYear(year);
        }
        else {
            e.target.year.value = releaseYear;
        }

        if (sort !== "") {
            setSorter(sort);
        }
        else {
            setSorter(props.sorter);
        }

        for (let i = 0; i < genreList.length; i++) {
            if (genreList[i].checked === true) {
                genresString = genresString + genreList[i].id + ",";
            }
        }
        genresString = genresString.substring(0, genresString.length - 1);
        setGenres(genresString);
    }

    return (
        <main>
            <section className="my-2">
                <form onSubmit={handleSearch}>
                    <div className="form-row d-flex justify-content-center">
                        <div className="col-auto">
                            <label htmlFor="year">Year</label>
                            <input id="year" type="number" name="year" min="1920" max={props.releaseYear}placeholder="release year" defaultValue="2019" />
                        </div>
                        <div className="dropdown col-auto">
                            <button type="button" className="dropdown-toggle btn btn-secondary" id="dropdownMenu" data-toggle="dropdown">
                                Genre
                            </button>
                            <div className="dropdown-menu">
                                {checkBoxGenreMenu()}
                            </div>
                        </div>
                        <div className="col-auto">
                            <label>Sort By</label>
                            <select name="selectSorters">
                                {dropDownSorterMenu()}
                            </select>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-secondary" type="submit">Search</button>
                        </div>
                    </div>
                </form >
            </section>
            <DisplayMovies movieData={movieData} />
        </main>
    );
};

Discover.defaultProps = {
    releaseYear: new Date().getFullYear(),
    sorter: "vote_average.desc",
    genres: ""
}

export default Discover;