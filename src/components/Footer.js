import React from 'react';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()

    return (
        <footer className="text-center mt-2">
            <p>&copy; {year} Jinhong Liang</p>
        </footer>
    );
}

export default Footer;