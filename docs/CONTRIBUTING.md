# Contributing

## Prerequisites

This project requires the following tools/technologies to run locally:

- [Node](https://nodejs.org/en/)(>=16.13.0)
- [Yarn](https://classic.yarnpkg.com/lang/en/)(>=1.22.17)

Once the above items have been properly installed you can download the project's dependencies with the following command:

```bash
$ yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Relevant Tools/Frameworks

- [Create React App](https://create-react-app.dev/) - CRA is a popular tool for scaffolding React projects and is used to build, test, and serve the application locally.
- [Chakra UI](https://chakra-ui.com/guides/integrations/with-cra) - Chakra provides the UI library/framework for the application.
- [ESLint](https://eslint.org/) - ESLint is the linter for the repository that statically analyzes code to quickly find problems.
- [Prettier](https://prettier.io/) - Prettier is the formatter for the repository that makes sure the code is formatted consistently throughout the project.
- [Husky](https://typicode.github.io/husky/#/) - Husky provides git hook callback functionality.
- [lint-staged](https://github.com/okonet/lint-staged) - lint-staged provides a way to run linters against staged files (instead of the entire codebase every time).
