/* global document, window */

import React from 'react';
import ReactDOM from 'react-dom';

const app = document.getElementById('app');

const initialState = window.__INITIAL_STATE__;

function renderRoot() {
    // eslint-disable-next-line import/newline-after-import
    const Root = require('./root.view').default;
    ReactDOM.render((<Root title={initialState.title} />), app);
}

// initial render
renderRoot();

if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./root.view', renderRoot);
}
