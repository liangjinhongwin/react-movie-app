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
            <div className="container p-0">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/discover" exact component={Discover} />
                    <Route path="/favourites" exact component={Favourites} />
                    <Route path="/rated" exact component={Rated} />
                    <Route path="/about" exact component={About} />
                    <Route path="/movie/id=:id" component={Movie} />
                    <Route path="/search/query=:title" component={Search} />
                </Switch>
            </div>
            <Footer />
        </div>
    </Router>
);

export default App;
