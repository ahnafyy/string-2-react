import React from 'react';
import { render } from '@testing-library/react';
import stringToReactComponent from './index';

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
    const html = '<div><p>Paragraph <strong>with strong text</strong></p></div>';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.tagName.toLowerCase()).toBe('div');
    expect(container.firstChild.firstChild.tagName.toLowerCase()).toBe('p');
    expect(container.firstChild.firstChild.firstChild.nodeType).toBe(Node.TEXT_NODE);
    expect(container.firstChild.firstChild.firstChild.textContent).toBe('Paragraph ');
    expect(container.firstChild.firstChild.lastChild.tagName.toLowerCase()).toBe('strong');
    expect(container.firstChild.firstChild.lastChild.textContent).toBe('with strong text');
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

  it('renders HTML entities as text content', () => {
    const html = '&lt;div&gt;Hello world&lt;/div&gt;';
    const { container } = render(stringToReactComponent(html));
    expect(container.firstChild.nodeType).toBe(Node.TEXT_NODE);
    expect(container.firstChild.textContent).toBe('<div>Hello world</div>');
  });
});

