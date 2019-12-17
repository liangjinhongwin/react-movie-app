import React from 'react';

const SearchBar = (props) => {
    const handleSearch = (e) => {
        e.preventDefault();
        let title = e.target.title.value;
        if (title && title !== '') {
            if (title.indexOf(' ') !== -1) {
                title = title.replace(/\s+/g, '+');
            }
            props.handleSearchBar(title);
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" name="title" placeholder="movie title" />
                <button className="btn btn-secondary" type="submit">Search</button>
            </form >
        </div>
    );
}

export default SearchBar;