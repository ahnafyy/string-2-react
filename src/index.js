import React from 'react';

export default function stringToReactComponent(html) {
  // Convert the HTML string to a DocumentFragment
  const fragment = document.createRange().createContextualFragment(html);

  // Convert the child nodes of the fragment to an array of React elements
  const reactComponents = Array.from(fragment.childNodes).map(child => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      // Convert the attributes of the element to props using Array.reduce()
      const props = Array.from(child.attributes).reduce((result, attr) => {
        result[attr.nodeName] = attr.nodeValue;
        return result;
      }, {});

      // Recursively convert the children of the element to React components
      const children = stringToReactComponent(child.innerHTML);

      // Return the React element
      return React.createElement(child.nodeName.toLowerCase(), props, children);
    } else if (child.nodeType === Node.TEXT_NODE) {
      // Return the text content of the node as a string
      return child.textContent;
    }
  });

  // Join the array of React elements into a single element
  return (
    <>{reactComponents}</>
  );
}
