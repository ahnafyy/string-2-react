import React from 'react';
import { render } from '@testing-library/react';
import stringToReactComponent, { isCustomSelfClosingElement } from './index';

describe('stringToReactComponent', () => {
  it('renders an empty string as an empty React component', () => {
    const emptyString = '';
    const { container } = render(stringToReactComponent(emptyString));
    expect(container.firstChild).toBe(null);
  });

  it('renders a single HTML element as a React component', () => {
    const html = '<div>Hello world</div>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.tagName.toLowerCase()).toBe('div');
    expect(container.firstChild.textContent).toBe('Hello world');
  });

  it('renders nested HTML elements as a nested React component', () => {
    const html =
      '<div><p>Paragraph <strong>with strong text</strong></p></div>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.tagName.toLowerCase()).toBe('div');
    expect(container.firstChild.firstChild.tagName.toLowerCase()).toBe('p');
    expect(container.firstChild.firstChild.firstChild.nodeType).toBe(
      Node.TEXT_NODE
    );
    expect(container.firstChild.firstChild.firstChild.textContent).toBe(
      'Paragraph '
    );
    expect(
      container.firstChild.firstChild.lastChild.tagName.toLowerCase()
    ).toBe('strong');
    expect(container.firstChild.firstChild.lastChild.textContent).toBe(
      'with strong text'
    );
  });

  it('renders HTML attributes as React props', () => {
    const html = '<a href="https://example.com">Link</a>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.tagName.toLowerCase()).toBe('a');
    expect(container.firstChild.href).toBe('https://example.com/');
    expect(container.firstChild.textContent).toBe('Link');
  });

  it('renders text nodes as text content', () => {
    const html = 'Text content';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.TEXT_NODE);
    expect(container.firstChild.textContent).toBe('Text content');
  });

  it('renders div as they should be', () => {
    const html = '<div>Hello world</div>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(container.firstChild.outerHTML).toBe('<div>Hello world</div>');
  });

  it('renders scripts as they should be', () => {
    const html = '<script>function(){}</script>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(container.firstChild.outerHTML).toBe(
      '<script>function(){}</script>'
    );
  });

  it('renders div with attributes as they should be', () => {
    const html = '<div id="myDiv" class="myClass">Hello world</div>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(container.firstChild.outerHTML).toBe(
      '<div id="myDiv" class="myClass">Hello world</div>'
    );
  });

  it('renders div with nested elements as they should be', () => {
    const html = '<div><p>Hello</p><p>World</p></div>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(container.firstChild.outerHTML).toBe(
      '<div><p>Hello</p><p>World</p></div>'
    );
  });

  it('renders link element with target attribute as they should be', () => {
    const html =
      '<link rel="stylesheet" type="text/css" href="style.css" target="_blank"/>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(container.firstChild.outerHTML).toBe(
      '<link rel="stylesheet" type="text/css" href="style.css" target="_blank">'
    );
  });

  it('renders image element with attributes as they should be', () => {
    const html = '<img src="image.jpg" alt="A beautiful sunset"/>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(container.firstChild.outerHTML).toBe(
      '<img src="image.jpg" alt="A beautiful sunset">'
    );
  });

  it('renders esi:include', () => {
    const html = "<esi:include src='foo_bar'/>";
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(container.firstChild.outerHTML).toBe(
      '<esi:include src="foo_bar"></esi:include>'
    );
  });

  // it('renders esi:include with self-closing tag', () => {
  //   const html = "<esi:include src='foo_bar'/>";
  //   const { container } = render(stringToReactComponent(html));
  //   expect(container.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
  //   expect(container.firstChild.outerHTML).toBe('<esi:include src="foo_bar"/>');
  // });
});

describe('isCustomSelfClosingElement', () => {
  it('should return false for a self-closing built-in element', () => {
    const node = document.createElement('input');
    node.setAttribute('type', 'text');
    const result = isCustomSelfClosingElement(node);
    expect(result).toBe(false);
  });

  it('should return false for a non-self-closing custom element', () => {
    const node = document.createElement('my-element');
    node.innerHTML = '<span>Test</span>';
    const result = isCustomSelfClosingElement(node);
    expect(result).toBe(false);
  });

  it('should return false for a non-self-closing built-in element', () => {
    const node = document.createElement('div');
    node.innerHTML = '<input type="text">';
    const inputNode = node.querySelector('input');
    const result = isCustomSelfClosingElement(inputNode);
    expect(result).toBe(false);
  });

  it('should return true for a non-self-closing built-in element', () => {
    const node = document.createElement('esi:include');
    node.setAttribute('src', 'foo');
    const result = isCustomSelfClosingElement(node);
    expect(result).toBe(true);
  });
});
