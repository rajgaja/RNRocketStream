  var React = require('react-native');
  var {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View,
  } = React;

  let SignIn = require('./user/SignIn');
  let HomeComp = require('./HomeComp');
  let ddpClient = require('../connections/ddp/ddpClient');
  let Accounts = require('../connections/accounts');

      var SCREEN_WIDTH = require('Dimensions').get('window').width;
      var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

      var swipe_con = '';              // Android Shared preference code will be added here 

    var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
      // Make it snap back really quickly after canceling pop
      snapVelocity: 8,
      // Make it so we can drag anywhere on the screen
      edgeHitWidth: SCREEN_WIDTH,
    });

    var CustomSceneConfig = Object.assign({}, BaseConfig, {
      // A very tighly wound spring will make this transition fast
      springTension: 100,
      springFriction: 10,
      // Use our custom gesture defined above
      gestures: {
        pop: null,
      }
    });

  var CompNav = React.createClass({

      componentDidMount() {
        ddpClient.initialize()
        .then(() => {
            return Accounts.signInWithToken();
        })
        .then((res) => {
            console.log(" RECEIVED A CB ");
            return this.setState({loaded: true});
        })
        .catch((err) => {
            console.log(" RECEIVED A ERROR CB ");
            return this.setState({loaded: true});
        });

        Accounts.emitter.on('loggedIn', (userId) => {
            if (userId) {
                console.log("USER LOGGED IN");
                console.log("User ID == "+ userId);
                this.setState({loggedIn: true});
                swipe_con = true;
            }
        });    
    },
    componentWillUnmount() {
        ddpClient.close();
    },


  _renderScene(route, navigator) {

    if (swipe_con) {
      if (route.id === 1) {
      return <HomeComp navigator={navigator} />        
      }        
    }else{
      if (route.id === 1) {
        return <SignIn navigator={navigator} />
      } else if (route.id === 2) {
        return <HomeComp navigator={navigator} />
      }
    }
  },
  _configureScene(route) {
    return CustomSceneConfig;
  },
  render() {
    return (
      <Navigator
        initialRoute={{id: 1, }}
        renderScene={this._renderScene}
        configureScene={this._configureScene} />
    );
  }

  });

  var styles = StyleSheet.create({
  container: {
  flex: 1
  },
  });

  module.exports = CompNav;