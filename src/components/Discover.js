import React, { useState, useEffect } from 'react';
import DisplayMovies from './DisplayMovies';

const Discover = () => {
    const [movieData, setMovieData] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
    const [genres, setGenres] = useState("");
    const [sorter, setSorter] = useState("popularity.desc");

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
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8f204ddbd3e76b6b335c89143c3f5dc&primary_release_year=${releaseYear}&with_genres=${genres}&sort_by=${sorter}&region=US`);
            let data = await res.json();
            setMovieData(data.results.slice(0, 12));
        }
        fetchMovies();
    }, [releaseYear, genres, sorter]);

    const dropDownSorterMenu = () => {
        let array = ["vote_average.desc", "vote_average.asc", "primary_release_date.desc", "primary_release_date.asc", "original_title.desc", "original_title.asc"];
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
        newList.find(genre => genre.id === Number(e.target.name)).checked = e.target.checked;
        setGenreList(newList);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let year = e.target.year.value;
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
            setSorter("popularity.desc");
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
            <section className="pt-3">
                <form onSubmit={handleSearch}>
                    <div className="form-row d-flex align-items-baseline">
                        <div className="col-auto">
                            <input id="year" type="number" name="year" min="1920" max={new Date().getFullYear()} placeholder="Year" defaultValue="2019" />
                        </div>
                        <div className="dropdown col-auto">
                            <button type="button" className="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown">
                                Genre
                            </button>
                            <div className="dropdown-menu">
                                {checkBoxGenreMenu()}
                            </div>
                        </div>
                        <div className="col-auto">
                            <select name="selectSorters">
                                <option value="">Sort By</option>
                                {dropDownSorterMenu()}
                            </select>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary" type="submit">&#10140;</button>
                        </div>
                    </div>
                </form >
            </section>
            <hr />
            <section>
                <DisplayMovies movieData={movieData} />
            </section>
        </main>
    );
}

export default Discover;