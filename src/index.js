import React from 'react';
const { parseHTML } = require('linkedom');

function convertNodeToReact(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    // Convert the attributes of the element to props using Array.reduce()
    const props = Array.from(node.attributes).reduce((result, attr) => {
      result[attr.nodeName] = attr.nodeValue;
      return result;
    }, {});

    // Recursively convert the children of the element to React components
    const children = Array.from(node.childNodes).map(convertNodeToReact);

    // Return the React element
    return React.createElement(node.tagName.toLowerCase(), props, children);
  } else if (node.nodeType === Node.TEXT_NODE) {
    // Return the text content of the node as a string
    return node.textContent;
  } else {
    // Ignore comments and other node types
    return null;
  }
}

export default function stringToReactComponent(html) {
  // Check if document is defined (client-side)
  if (typeof document !== 'undefined') {
    // Convert the HTML string to a DocumentFragment
    const fragment = document.createRange().createContextualFragment(html);

    // Convert the child nodes of the fragment to an array of React elements
    const reactComponents = Array.from(fragment.childNodes).map(convertNodeToReact);

    // Join the array of React elements into a single element
    return (
      <>{reactComponents}</>
    );
  } else {
    // Parse the HTML string into a DOM tree (server-side)
    const { document } = parseHTML(html);

    // Convert the child nodes of the document to an array of React elements
    const reactComponents = Array.from(document.body.childNodes).map(convertNodeToReact).filter(Boolean);

    // Join the array of React elements into a single element
    return React.createElement(React.Fragment, null, ...reactComponents);
  }
}
