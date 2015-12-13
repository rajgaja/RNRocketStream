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
      Navigator,
      View,
      ListView,
      Navigator,
      Text,
      TextInput,
      TouchableHighlight,
    } = React;

    var DRAWER_WIDTH_LEFT = 56;

        var _ = require('lodash');

        var EJSON = require("ejson");
        var Dimensions = require('Dimensions');
        var windowSize = Dimensions.get('window');


        var DDPClient = require("ddp-client");
        var UIExplorerPage = require('./CompPage');
        // var MyNative = require('./MyNative');
        var Login = '';

        var ddpClient = new DDPClient({url: 'ws://192.168.0.102:3000/websocket'});

        const CONNECTION_ISSUE_TIMEOUT = 5000;


        var myrows = "";


        var SCREEN_WIDTH = require('Dimensions').get('window').width;
        var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

        var Dimensions = require('Dimensions');
        var windowSize = Dimensions.get('window');

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


        var DataStream = React.createClass({



          getInitialState: function() {

        ddpClient.connect(() => ddpClient.subscribe('posts' , [{ sort: { submitted: -1, _id: -1 }, limit: 100 }]));

            return {
              dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
              }),
              loaded: false,
            };
          },


          textOnPress: function() {

          if (this.state.Todos !== '') {
            console.log("Lets see Todos");

            ddpClient.call('push' , function(err, result) {
              console.log('called function, result: ' + result);
            });            

          }
      },

      TodosInput(event) {
        this.setState({ Todos: event.nativeEvent.text });
        console.log("React at event" + this.state.Todos);
      },

      componentDidMount: function() {

        if (typeof this.process === 'undefined') {
          process = {};
          process.nextTick = setImmediate;
        }

            // observe the lists collection
            var observer = ddpClient.observe("posts");
            console.log("Observer --- "+ observer);
            observer.added = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.posts.find())));
            observer.changed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.posts.find())));
            observer.removed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.posts.find())));

          },

          updateRows: function(rows) {
            this.setState({
             dataSource: this.state.dataSource.cloneWithRows(rows),
             loaded: true,
           });
            console.log("Rows === "+ rows)
          },  


          render: function() {
            if (!this.state.loaded) {
              return this.renderLoadingView();
            }

            return (

              <CompPage
              title={this.props.navigator ? null : '<ListView> - Simple'}
              noSpacer={true}
              noScroll={true}>

              <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderList}
                  // style={styles.listView}
                  />

                  <View style={styles.flowRight}>
                  <TextInput 
                  style={styles.spamInput} 
                  onChange={this.TodosInput}
                  placeholder='Lets Todos...'
                  multiline={true}onSearchTextChanged
                  />
                  <TouchableHighlight style={styles.button}
                  onPress={this.textOnPress}
                  underlayColor='#99d9f4'>
                  <Text style={styles.buttonText}>Go</Text>
                  </TouchableHighlight>
                  </View>

                  </CompPage>  

                  );
          },

          renderLoadingView: function() {
            return (
              <View style={styles.container}>
              <Text>
              Loading lists...
              </Text>
              </View>
              );
          },

          renderList: function(list) {
            console.log("List Data " + list);
            return (
              <View style={styles.container}>
              <Text style={styles.name}>{list.title}</Text>
              <Text style={styles.incompleteCount}>{list.incompleteCount}</Text>
              </View>
              );
          },

      });


    var styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      toolbar: {
        backgroundColor: '#E9EAED',
        height: 56,
      },

      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white',
      },

        lgcontainer: {
          flexDirection: 'column',
          flex: 1,
          backgroundColor: 'transparent'
        },
        name: {
          flex: 5,
          fontSize: 18,
        },
        flowRight: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
        },
        buttonText: {
          fontSize: 18,
          color: 'white',
          alignSelf: 'center'
        },
        button: {
          height: 36,
          flex: 0.5,
          flexDirection: 'row',
          backgroundColor: '#48BBEC',
          borderColor: '#48BBEC',
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 10,
          alignSelf: 'stretch',
          justifyContent: 'center'
        },
        spamInput: {
          padding: 4,
          marginRight: 5,
          flex: 4,
          color: '#48BBEC'
        },
        incompleteCount: {
          flex: 1,
          textAlign: 'center',
          fontSize: 20,
          color: '#2196F3',
        },
        listView: {
          paddingTop: 20,
          backgroundColor: 'white',
        },

        bg: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: windowSize.width,
          height: windowSize.height
        },
        header: {
          justifyContent: 'center',
          alignItems: 'center',
          flex: .5,
          backgroundColor: 'transparent'
        },
        mark: {
          width: 150,
          height: 150
        },
        signin: {
          backgroundColor: '#FF3366',
          padding: 20,
          alignItems: 'center'
        },
        signup: {
          justifyContent: 'center',
          alignItems: 'center',
          flex: .15
        },
        inputs: {
          marginTop: 10,
          marginBottom: 10,
          flex: .25
        },
        inputPassword: {
          marginLeft: 15,
          width: 20,
          height: 21
        },
        inputUsername: {
          marginLeft: 15,
          width: 20,
          height: 20
        },
        inputContainer: {
          padding: 10,
          borderWidth: 1,
          borderBottomColor: '#CCC',
          borderColor: 'transparent'
        },
        input: {
          position: 'absolute',
          left: 61,
          top: 12,
          right: 0,
          height: 35,
          fontSize: 14
        },
        forgotContainer: {
          alignItems: 'flex-end',
          padding: 15,
        },
        greyFont: {
          color: '#D8D8D8'
        },
        whiteFont: {
          color: '#FFF'
        }
    });

    module.exports = DataStream;
