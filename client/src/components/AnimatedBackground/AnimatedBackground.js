import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = Page => {
  return props =>
    <div className="login-wrapper valign-wrapper">
        <Page {...props} />
    </div>;
};

export default AnimatedBackground;