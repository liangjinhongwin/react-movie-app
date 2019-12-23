import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/" exact>The Movie App</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item " data-toggle="collapse" data-target="#navbarNav">
                        <NavLink className="nav-link" to="/" exact>Home</NavLink>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarNav">
                        <NavLink className="nav-link" to="/discover/movie" exact>Discover</NavLink>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarNav">
                        <NavLink className="nav-link" to="/movie/favourites" exact>My Favourites</NavLink>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarNav">
                        <NavLink className="nav-link" to="/movie/rated" exact>My Rated</NavLink>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarNav">
                        <NavLink className="nav-link" to="/about" exact>About</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Header;