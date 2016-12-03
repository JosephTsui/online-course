import React from 'react';
import ReactDOM from 'react-dom';

const app = document.getElementById('app');

function renderRoot() {
    // eslint-disable-next-line import/newline-after-import
    const Root = require('./root.view').default;
    ReactDOM.render((<Root />), app);
}

// initial render
renderRoot();

if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./root.view', renderRoot);
}
