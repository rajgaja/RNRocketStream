    'use strict';

    var React = require('react-native');
    var {
      AppRegistry,
      BackAndroid,
      Dimensions,
      Image,
      DrawerLayoutAndroid,
      StyleSheet,
      ToolbarAndroid,
      View,
      ListView,
      Navigator,
      Text,
      TextInput,
      TouchableHighlight,
    } = React;
    
    var DrawerList = require('./DrawerList');

    var DRAWER_WIDTH_LEFT = 56;

        var _ = require('lodash');

        var EJSON = require("ejson");
        var Dimensions = require('Dimensions');
        var windowSize = Dimensions.get('window');

        var CompPage = require('./CompPage');
        var DataStream = require('./DataStream');



  var HomeComp = React.createClass({
    getInitialState: function() {
      return {
        example: this._getUIExplorerHome(),
      };
    },

    _getUIExplorerHome: function() {
      return {
        title: 'Y0Spam',
        component: this._renderHome(),
      };
    },

    componentWillMount: function() {
      BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonPress);
    },

    render: function() {
      return (
        <DrawerLayoutAndroid
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
          keyboardDismissMode="on-drag"
          ref={(drawer) => { this.drawer = drawer; }}
          renderNavigationView={this._renderNavigationView}>
          {this._renderNavigation()}
        </DrawerLayoutAndroid>
        );
    },

    _renderNavigationView: function() {
      return (
        <DrawerList
          onSelectExample={this.onSelectExample}
          isInDrawer={true}
        />
      );
    },

    onSelectExample: function(example) {
      this.drawer.closeDrawer();
      if (example.title === this._getUIExplorerHome().title) {
        example = this._getUIExplorerHome();
      }
      this.setState({
        example: example,
      });
    },

    _renderHome: function() {
      var onSelectExample = this.onSelectExample;
      return React.createClass({
        render: function() {
          console.log("Reached render Home");
          return (
			
          	<CompPage
              title={this.props.navigator ? null : 'Home Stream'}
              noSpacer={true}
              noScroll={true}>

              	 <DataStream
                onSelectExample={onSelectExample}
                isInDrawer={false}
              	/>

            </CompPage>  

          );
        }
      });
    },

    _renderNavigation: function() {
      //navIcon={require('image!ic_menu_black_24dp')}
      // logo={require('image!launcher_icon')}
      var Component = this.state.example.component;
      return (
        <View style={styles.container}>
          <ToolbarAndroid
            navIcon={require('../ic_menu_black_24dp.png')}
            logo={require('../launcher_icon.png')}
            onIconClicked={() => this.drawer.openDrawer()}
            style={styles.toolbar}
            title={this.state.example.title}
          />
          <Component />
        </View>
      );
    },

    _handleBackButtonPress: function() {
      if (this.state.example.title !== this._getUIExplorerHome().title) {
        this.onSelectExample(this._getUIExplorerHome());
        return true;
      }
      return false;
    },
  });


  var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


  module.exports = HomeComp ;