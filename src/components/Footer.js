import React from 'react';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()

    return (
        <footer className="bg-dark pt-3 pb-1 text-center text-white">
            <p>&copy; {year} Jinhong Liang</p>
        </footer>
    );
}

export default Footer;