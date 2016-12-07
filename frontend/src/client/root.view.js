import React, { PropTypes } from 'react';

export default function Root(props) {
    return (<h1>{props.title}</h1>);
}

Root.propTypes = {
    title: PropTypes.string.isRequired
};
