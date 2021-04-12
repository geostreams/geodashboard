# Geodashboard V3

Part of the [Geostreaming Data Framework](https://geodashboard.ncsa.illinois.edu/). Web frontend to explore, search and
visualize data stored in the Geostreaming Web Service.

Built on react.js, redux, webpack, babel, react-router, openlayers 3.

## How to Build

Requirements: [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com).

Install dependencies: `yarn install` (or `npm install`)

Develop: `yarn start` (or `npm start`)

Build: `yarn run build` (or `npm run build`)

Test for flow: `yarn run flow` (or `npm run-script flow`)

Once built you can create a docker image by running (change tag name as appropriate): 

```docker build -t geostreams/geodashboard:3.0.0 .```
