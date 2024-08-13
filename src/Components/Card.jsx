import React from 'react';

const Card = ({ title, imgSrc, description, link }) => (
    <div className="card">
        <h3>{title}</h3>
        <img src={imgSrc} alt="Photo" className="card-img" />
        <div className="card-info">
            <p>{description}</p>
            {link && <a href={link} className="btn">Try Now</a>}
        </div>
    </div>
);

export default Card;
