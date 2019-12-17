import React from 'react';
import logo from "../images/tmdb-logo.png";

const About = () => {
    return (
        <main>
            <section className="mt-5">
                <h4 className="text-center  mb-5">This product uses the TMDb API but is not endorsed or certified by TMDb.</h4>
            </section>
            <section>
                <figure className="d-flex justify-content-center">
                    <img src={logo} alt="tmdb-logo" />
                </figure>
            </section>
        </main>
    );
}

export default About;