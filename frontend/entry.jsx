var React = require('react');
var ReactDOM = require('react-dom');
var IndexRoute = require('react-router').IndexRoute;

var Router = require('react-router').Router;
var Route = require('react-router').Route;

var App = require('./components/app.jsx');
var CreateView = require('./components/create/createView.jsx');
var WriterToolbar = require('./components/create/writerToolbar');
var StyleToolbar = require('./components/create/styleToolbar');
var IndexView = require('./components/indexView');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={IndexView}/>
    <Route path="/create" component={CreateView}>
      <IndexRoute component={WriterToolbar}/>
      <Route path="/create/stylize" component={StyleToolbar} />
    </Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('content')
  );
});