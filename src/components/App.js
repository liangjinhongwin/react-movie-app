// The Movie App
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import Header from './Header';
import Footer from './Footer';
// Pages
import Home from './Home';
import Movie from './Movie';
import About from './About';
import Search from './Search';
import Discover from './Discover';
import Favourites from './Favourites';
import Rated from './Rated';
import "../styles/styles.css";

const App = () => (
    <Router>
        <div className="wrapper">
            <Header />
            <div className="container">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/discover/movie" exact component={Discover} />
                    <Route path="/movie/favourites" exact component={Favourites} />
                    <Route path="/movie/rated" exact component={Rated} />
                    <Route path="/movie/id=:id" exact component={Movie} />
                    <Route path="/search/movie/title=:title" exact component={Search} />
                    <Route path="/about" exact component={About} />
                </Switch>
            </div>
            <Footer />
        </div>
    </Router>
);

export default App;
