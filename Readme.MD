
# 🚀 string-2-react 🚀

Turn your valid HTML strings into React components with ease! `string-2-react`

## Installation

You can install the package using `npm` or `yarn`:

bashCopy code

`npm install string-2-react` 

bashCopy code

`yarn add string-2-react` 

## Usage

javascriptCopy code

`const { stringToReactComponent } = require('string-2-react');

const htmlString = '<div><h1>Hello World</h1><p>Welcome to my awesome website!</p></div>';
const reactComponent = stringToReactComponent(htmlString);

console.log(reactComponent);
// Output: <div><h1>Hello World</h1><p>Welcome to my awesome website!</p></div>` 

## API

### `stringToReactComponent(html: string): string`

Transforms the given HTML string into a React component string.

#### Arguments

-   `html` (string): The HTML string to convert.

#### Returns

-   The React component.

This is a package that converts your valid HTML strings into React components, making it easier to integrate them into your React applications.

## Advantages

👍 `string-2-react` is a lightweight package that can be easily integrated into your React project.

👍 It efficiently converts your HTML strings into React components.

👍 The package is easy to use, and you can get started with just a few lines of code.

👍 It handles different types of HTML elements, including self-closing tags, start tags, and end tags, as well as `<script>` tags.

## Limitations

👎 `string-2-react` is not meant to handle complex HTML strings that include other types of non-HTML content besides `<script>` tags.

👎 The regular expressions used to parse the HTML strings may not be sufficient for every use case, and you may need to modify them to fit your specific needs.

## Conclusion

If you find any bugs or want to contribute to the project, feel free to open an issue or submit a pull request on GitHub.