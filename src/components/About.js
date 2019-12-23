import React from 'react';
import logo from "../images/tmdb-logo.png";

const About = () => {
    return (
        <main className="py-1">
            <section className="my-2 text-center">
                <h4>This is a movie app that using data from TMDb API.</h4>
                <p className="text-muted">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
            </section>
            <section>
                <figure className="d-flex justify-content-center">
                    <img src={logo} alt="tmdb-logo" width="200"/>
                </figure>
            </section>
        </main> 
    );
}

export default About;