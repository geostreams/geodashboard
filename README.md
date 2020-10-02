## Geodashboard

This repository uses [Lerna](https://github.com/lerna/lerna) to manage all the links and dependencies between
the `gd-core` package and project packages like `gd-gltg`.

It uses `node = 12`, `npm >= 6`, `less` for styling, and `ES6` syntax for all `js` files except for `webpack` configs.

### Main files in project root:

- `.editorconfig`: Used by most IDEs to set up consistent editing rules.
- `.eslintrc`: Rules for `eslint`. It extends rules by [airbnb](https://github.com/airbnb/javascript)
and [prettier](https://github.com/prettier/eslint-config-prettier).
- `.prettierrc`: Rules for `prettier`.
- `lerna.json`: Contains the list of packages that require the shared dependencies in `package.json` in project root.
- `webpack.*.js`: These are the base webpack config files that can be extended by each project.

### Set up your environment:

> Note: whenever you see `<project-name>`, it refers to the project you are working on as listed in `lerna.json`,
>e.g. `gd-gltg`.

After cloning the repo, run `git submodule init` and `git submodule update` to initiate data stories
from `https://opensource.ncsa.illinois.edu/bitbucket/projects/GEOD/repos/geodashboard-datastories/browse`.

Then run `npm install` to install the shared and project dependencies and set up the links between `gd-core` and
other projects.

To start a specific project, run `npm start -- <project-name>`.

To build a project, run `npm run build -- <project-name>`. This creates the bundles for the given project and puts
them in `<project-name>/build` folder.

To check flow types, run `npm run flow`.

To check `eslint` and `prettier` rules, run `npm run lint`. These rules are also included in `webpack` config and
you would see the errors and warnings in the console. Most IDEs have support for these linters and you can set them up
so your IDE automatically applies the rules or warns you about their violations.

This repository has a pre-commit hook for linting, which is handled by `lint-staged` and is configured in
`package.json` (see entries for `husky` and `lint-stagesd` there). The configured pre-commit hook prevents any commit
that violates the linting rules. Make sure to fix those errors before committing, or if there is no way around the
errors, explicitly disable them.
See [`eslint` user guide for more details](https://github.com/prettier/eslint-config-prettier).

### How to set up a new project:

The easiest way is to copy `gd-template` folder and rename and customize it for the new project. Then include the
project name in `lerna.json`, under `packages`.

After adjusting the files in the new project folder and customizing its `package.json`, run `npm install` to
set up its dependencies and links. Make sure `gd-core` is included in the project `package.json`, unless your project
does not depend on `gd-core`.

If you are extending the base `webpack` configs, then your project must provide `src/index.jsx` and `src/index.html`.

### What goes where?

All code that can be (re-)used by other projects should go in `gd-core`. Here are some examples:

- React generic components and container, e.g. carousel, openlayers map, file uploader, d3 visualizations
- Utility functions, e.g. formatters and converters
- Shared styles like typography and icons

Everything else that is only relevant to one or two specific projects should go in their own project folders.

### Recommended practices:

| Description                                                                                                                                                                                                             | Rationale                                                                                                                                                                              |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Core should only have components. These are React objects that are project agnostic and can be used anywhere.                                                                                                           |                                                                                                                                                                                        |
| Each component should have a corresponding component in `gd-core/src/tests/`.                                                                                                                                           | Such tests make it easier for others to see how a component can be initialized and used.                                                                                               |
| Projects should only have containers, each container is a folder or file containing all the relevant code for one specific view                                                                                         | This way, all parts of a view are in one place, which should make it easier to follow the relations between different sections of a view.                                              |
| Each project container should connect to the store only in its entry point, i.e. the `index.jsx` file in its folder. All other sections of a container should receive the data and event handlers they need through their props. | This way, other parts of a view than its entry file can be wrapped and used in other places. For example, we can create a React Native wrapper in the same folder that uses the same parts. |
| Where possible, try to use pure functions for React components/containers instead of `Component` class. | Pure functions are more performant and easier to debug. It should be possible to write most views with them by using [React hooks](https://reactjs.org/docs/hooks-overview.html), which provide similar features as class context and state for functions. |
| Updates to containers and components internal state must happen in a safe way. If you need to use a current value in the state for updating the state, use the callback function provided by `setState`.  | Syntax like `this.setState({ activeCategory: !this.state.activeCategory })` are not safe, because the value of `activeCategory` might change while it's being used. |
| Consult the linters rules and their description when you see a linting warning. <sup>2</sup> | Though most of the linting rules are subjective and mainly recommendation to make the code more readable, many of them are there to prevent logical errors and unintentional bugs, e.g. `no-nested-ternary`. |

> <sup>1</sup> `Immutable.js` is currently disabled, because the old code does not play well with it. As the old code gets refactored, we should keep Immutable practices in mind so we can enable it later.

> <sup>2</sup> These rules should always be open to discussion. If something feels unnecessary, we should discuss it as a team and update it to make things work best for the whole team.

### Project structure:

Each project can use extend `gd-core` to easily set up it routes and renders its views. `gd-core` provides a `render`
function in `gd-core/src/render.jsx` that accepts a collection of reducers and routes and connects those to `redux`
store and `react-router`. This function accepts a third optional argument, which is used as a callback with the `store`
passed to it after its initialization.

See `index.jsx`, `routes.js` and `reducers/index.js` in `gd-geostreaming/src` for an example of how routes and reducers
can be set up.

### Environment variables

This a list of high level environment variables. For project-specific variables, see their README file in their folders.

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| CONTEXT | string | | The url path context the app is running in, e.g. `CONTEXT=/bmp` |
