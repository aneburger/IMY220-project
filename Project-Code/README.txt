// initliaze node
npm init -y
npm install express
npm install path

// update relavent components with proptypes
npm install prop-types

// add babel
npm install --save-dev @babel/cli @babel/core @babel/preset-env

// Add react basics
npm install react react-dom
npm install react-router-dom
npm install --save-dev @babel/preset-react babel-loader webpack webpack-cli

// Add CSS 
npm install --save-dev style-loader css-loader

// Add webpack
npx webpack
npm start

// run in a separate terminal for auto-rebundling on changes
npx webpack -w


===============================================================

IMY220 - Project
Ané Burger - 24565068

GitHub repository URL:
https://github.com/aneburger/IMY220-project


// URL
http://localhost:3000

docker build -t imy-project .

docker run -p 3000:3000 imy-project

