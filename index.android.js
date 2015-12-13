/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View,
} = React;

// Polyfill the process functionality needed for minimongo-cache
global.process = require("./connections/ddp/process.polyfill");

let CompNav = require('./components/CompNav');

var RNRocketStream = React.createClass({

    render() {
      return (
        <CompNav />
      );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('RNRocketStream', () => RNRocketStream);
