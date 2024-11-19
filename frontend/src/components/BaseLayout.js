import React from 'react';
import '../styles/mobile.css';

const BaseLayout = ({ children, title }) => {
    return (
        <div className="base-container">
            {title && <h2 className="base-title">{title}</h2>}
            <div className="base-content">{children}</div>
        </div>
    );
};

export default BaseLayout;
