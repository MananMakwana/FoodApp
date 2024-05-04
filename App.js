import React from "react";
import ReactDom from "react-dom/client";

const heading = React.createElement(
    'h1',
    {
        id: 'title'
    },
    'Heading 1'
)

const container = React.createElement(
    'div',
    {
        id: 'container',
        hello: 'world',
    },
    [heading]
)

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(container);