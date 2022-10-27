# eslint-plugin-react-lint

ReactLint is a EsLint plugin to search code smells on React applications

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-react-lint`:

```sh
npm install eslint-plugin-react-lint --save-dev
```

## Usage

Add `react-lint` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-lint"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-lint/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


