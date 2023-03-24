
# string-2-react 🧵  ⚛️

Turn your valid HTML strings into React components with ease! 

## Installation

You can install the package using `npm` or `yarn`:

```bash
npm install string-2-react
```

```bash
yarn add string-2-react 
```

## Usage

```javascript
`const { stringToReactComponent } = require('string-2-react');

const htmlString = '<div><h1>Hello World</h1><p>Welcome to my awesome website!</p></div>';
const reactComponent = stringToReactComponent(htmlString);

console.log(reactComponent);
// Output: <div><h1>Hello World</h1><p>Welcome to my awesome website!</p></div>` 
```

## API

### `stringToReactComponent(html: string): string`

Transforms the given HTML string into a React component string.

#### Arguments

-   `html` (string): The HTML string to convert.

#### Returns

-   The React component.

This is a package that converts your valid HTML strings into React components, making it easier to integrate them into your React applications.

## Advantages

- `string-2-react` is a lightweight package that can be easily integrated into your React project.

- It efficiently converts your HTML strings into React components.

- The package is easy to use, and you can get started with just a few lines of code.

- It handles different types of HTML elements, including self-closing tags, start tags, and end tags, as well as `<script>` tags.

## Limitations

- `string-2-react` is not meant to handle complex HTML strings that include other types of non-HTML content besides `<script>` tags.

- Does not sanitize the html 

- Does not do validation

- Does not provide support against XSS

## Conclusion

If you find any bugs or want to contribute to the project, feel free to open an issue or submit a pull request on GitHub.
