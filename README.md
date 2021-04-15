# Geodashboard: Geostreams Frontend Component Library


Geodashboard is the frontend component of the the [Geostreaming Data Framework](https://geodashboard.ncsa.illinois.edu/). It built using React to explore, search and
visualize data stored in [Geostreaming API](https://github.com/geostreams/geostreams). This repository contains the base components library used in different projects that use geostreams. 


## Install

Geodashboard components are available as npm packages.
- [@geostreams/core](https://www.npmjs.com/package/@geostreams/core)
- [@geostreams/geostreaming](https://www.npmjs.com/package/@geostreams/geostreaming)

```bash
# If you use npm:
npm install @geostreams/core @geostreams/geostreaming

# Or if you use Yarn:
yarn add @geostreams/core @geostreams/geostreaming
```

For setting up a new project based on geodashboard, go to [Usage > New Project](#new-project). If using geodashboard in an existing project, go to [Usage > Existing Project](#existing-project).

## Set up development environment
> Yarn workspaces is used to setup lerna. Make sure you have yarn installed globally before proceeding. To install, run `npm install --global yarn`

- From the repository root folder, run
  ```bash
  yarn install
  ```
- The geostreaming and core packages can be run standalone for testing by:
  ```bash
  yarn start @geostreams/geostreaming 
  #Short command: yarn geostreaming
  
  yarn start @geostreams/core 
  #Short command: yarn core

  ```

### Linking guide
To test and see changes in your project, complete the following steps:
- From the repository root folder, run
  ```bash
  yarn link:all 
  #Creates symlinks for all packages in this repository to the global node_modules folder)
  ```
- Go into the project repository folder and run the following commands to link:
  ```bash
  # Link individual packages:
  yarn link @geostreams/core
  yarn link @geostreams/core__old
  yarn link @geostreams/geostreaming

  # Link all packages:
  yarn link:geostreams
  ```

Any changes you make now in your local version should be reflected in your project app as well.

## Usage

Any project can use extend `@geostreams/core` to easily set up it routes and renders its views. `@geostreams/core` provides a `render`
function in `@geostreams/core/src/render.jsx` that accepts a collection of reducers and routes and connects those to `redux`
store and `react-router`. This function accepts a third optional argument, which is used as a callback with the `store`
passed to it after its initialization.

See `index.jsx`, `routes.js` and `reducers/index.js` in `@geostreams/geostreaming/src` for an example of how routes and reducers can be set up.

#### Existing project

To incorporate Geodashboard in an existing project or updating geodashboard, do the following steps:
1 Include `node_modules/@geostreams` directory in babel-loader config. (For webpack, this is located in webpack config file)
2 Add the following css files to either your webpack config or project entry .js(x) file:
    -- `@geostreams/core/src/styles/core.less`
    -- `ol/ol.css`
    -- `ol-layerswitcher/src/ol-layerswitcher.css`
    
If there are any issues, refer to the `template` folder's webpack configuration. 

#### New project

Create a new repository and move the contents of the template folder to the new repository. These files contain the basic setup of the geostreaming pages. 

After adjusting the files in the new project folder and customizing its `package.json`, run `npm install` to set up its dependencies and links. Make sure `@geostreams/core` and `@geostreams/geostreaming` is included in the project `package.json`, unless your project does not depend on geostreams.

If you are extending the base `webpack` configs, then your project must provide `src/index.jsx` and `src/index.html`.

Refer to existing projects repositories for more information on how to setup a new project.


## Documentation


## Support / Contributing

[Contributing Guide]

## Tools Behind Geodashboard

Geodashboard is built using:

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Material UI](https://material-ui.com/)
- [Open Layers](https://openlayers.org)
- [D3](https://d3js.org/)


[Contributing Guide]: CONTRIBUTING.md
