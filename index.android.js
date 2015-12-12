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
  View,
} = React;

// Polyfill the process functionality needed for minimongo-cache
global.process = require("./connections/ddp/process.polyfill");

let SignIn = require('./components/user/SignIn');

var RNRocketStream = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <SignIn />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('RNRocketStream', () => RNRocketStream);
