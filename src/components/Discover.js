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
        let array = [
            { name: "Popularity", value: "popularity.desc" },
            { name: "Rating Descending", value: "vote_average.desc" },
            { name: "Rating Ascending", value: "vote_average.asc" },
            { name: "Release Date Descending", value: "primary_release_date.desc" },
            { name: "Release Date Ascending", value: "primary_release_date.asc" },
            { name: "Title Descending", value: "original_title.desc" },
            { name: "Title Ascending", value: "original_title.asc" }
        ];
        const sorters = array.map((sorter, i) =>
            <option key={i} value={sorter.value}>{sorter.name}</option>
        );
        return sorters;
    }

    const checkBoxGenreMenu = () => {
        const list = genreList.map((genre, i) =>
            <span className="dropdown-item" key={i}>
                <input id={genre.name} type="checkbox" name={genre.id} onChange={handleCheck} />
                <label htmlFor={genre.name}>{genre.name}</label>
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

        setSorter(sort);

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
                    <div className="form-row d-flex flex-wrap">
                        <div className="col-auto">
                            <input id="year" type="number" name="year" min="1920" max={new Date().getFullYear()} placeholder="Year" defaultValue="2019" />
                        </div>
                        <select className="col-auto" name="selectSorters">
                            {dropDownSorterMenu()}
                        </select>
                        <div className="dropdown col-auto">
                            <button type="button" className="btn btn-outline-dark btn-sm dropdown-toggle" id="dropdownMenu" data-toggle="dropdown">
                                Genre
                            </button>
                            <div className="dropdown-menu">
                                {checkBoxGenreMenu()}
                            </div>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary btn-sm" type="submit">&#10140;</button>
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