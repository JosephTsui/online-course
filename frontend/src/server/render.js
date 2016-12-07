import ReactDOMServer from 'react-dom/server'
import React from 'react';
import Root from '../client/root.view';

export const initialState = {
    title: 'Online Course'
};

export default async function render() {
    return ReactDOMServer.renderToString(<Root title={initialState.title} />);
}
