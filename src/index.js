import React from 'react';
const { parseHTML } = require('linkedom');

function convertNodeToReact(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    // Get the tag name
    const tagName = node.tagName.toLowerCase();

    // Convert the attributes of the element to props using Array.reduce()
    const props = Array.from(node.attributes).reduce((result, attr) => {
      result[attr.nodeName] = attr.nodeValue;
      return result;
    }, {});

    // Recursively convert the children of the element to React components
    const children = Array.from(node.childNodes).map(convertNodeToReact);

    // We gotta check if you are a custom element and have self closing tag
    const isSelfClosingCustomElement = isCustomSelfClosingElement(node);

    // Handle creating an element with a self closing tag and if you are a custom element
    // We gotta also handle your children if you have any
    // We cannot use React.createElement because they don't support self closing tags for custom elements
    if (isSelfClosingCustomElement) {
      // TO DO:

      // Return the element with the tag name
      return React.createElement(tagName, props, ...children);
    }
    return React.createElement(tagName, props, ...children);
  } else if (node.nodeType === Node.TEXT_NODE) {
    // Return the text content of the node as a string
    return node.textContent;
  } else {
    // Ignore other node types (for now cause theres only so much time in the day!)
    return null;
  }
}

// Reference :
// https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements
// https://developer.mozilla.org/en-US/docs/Glossary/Void_element
export function isCustomSelfClosingElement(node) {
  // Get the tag name
  const tagName = node.tagName.toLowerCase();

  // Is a void element (self closing) and does not have children
  const isVoidElement = node.childNodes.length === 0;

  // Check if the element is a custom element
  const isACustomElement = tagName.includes(':') || tagName.includes('-');

  return isVoidElement && isACustomElement;
}

export default function stringToReactComponent(html) {
  // Check if document is defined (client-side)
  if (typeof document !== 'undefined') {
    // Convert the HTML string to a DocumentFragment
    const fragment = document.createRange().createContextualFragment(html);

    // Convert the child nodes of the fragment to an array of React elements
    const reactComponents = Array.from(fragment.childNodes).map(
      convertNodeToReact
    );

    // Join the array of React elements into a single element
    return <>{reactComponents}</>;
  } else {
    // Parse the HTML string into a DOM tree (server-side)
    const { document } = parseHTML(html);

    // Convert the child nodes of the document to an array of React elements
    const reactComponents = Array.from(document.body.childNodes).map(
      convertNodeToReact
    );

    // Join the array of React elements into a single element
    return <>{reactComponents}</>;
  }
}
