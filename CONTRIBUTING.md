# Contributing

Refer to README file to setup development local environment. 


### Main files in project root:

- `.editorconfig`: Used by most IDEs to set up consistent editing rules.
- `.eslintrc`: Rules for `eslint`. It extends rules by [airbnb](https://github.com/airbnb/javascript)
and [prettier](https://github.com/prettier/eslint-config-prettier).
- `.prettierrc`: Rules for `prettier`.
- `lerna.json`: Contains the list of packages that require the shared dependencies in `package.json` in project root.
- `webpack.*.js`: These are the base webpack config files that can be extended by each project.
- 


### Additional Scripts

To check flow types, run `npm run flow`.

To check `eslint` and `prettier` rules, run `npm run lint`. These rules are also included in `webpack` config and
you would see the errors and warnings in the console. Most IDEs have support for these linters and you can set them up
so your IDE automatically applies the rules or warns you about their violations.

This repository has a pre-commit hook for linting, which is handled by `lint-staged` and is configured in
`package.json` (see entries for `husky` and `lint-stagesd` there). The configured pre-commit hook prevents any commit
that violates the linting rules. Make sure to fix those errors before committing, or if there is no way around the
errors, explicitly disable them.
See [`eslint` user guide for more details](https://github.com/prettier/eslint-config-prettier).


### What goes where?

All code that can be (re-)used by other projects should go in `gd-core`. Here are some examples:

- React generic components and container, e.g. carousel, openlayers map, file uploader, d3 visualizations
- Utility functions, e.g. formatters and converters
- Shared styles like typography and icons


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