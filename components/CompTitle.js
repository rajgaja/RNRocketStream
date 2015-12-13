'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var CompTitle = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.title}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'red',
    margin: 5,
    marginBottom: 0,
    height: 45,
    padding: 10,
    backgroundColor: 'yellow',
  },
  text: {
    fontSize: 19,
    fontWeight: '500',
  },
});

module.exports = CompTitle;
