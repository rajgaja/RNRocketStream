'use strict';
var React = require('react-native');
var {
    Image,
    Navigator,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    BackAndroid,
    Dimensions,
} = React;

// var _ = require('lodash');
// var EJSON = require("ejson");
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
let ddpClient = require('../../connections/ddp/ddpClient');
let Accounts = require('../../connections/accounts');


var SignIn = React.createClass({
    getInitialState() {
        return {
            email: '',
            password: '',
            error: null,
            user: false,
        };
    },
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
    },
    componentWillMount() {
        Accounts.emitter.on('loggedIn', (userId) => {
            if (userId) {
                console.log("USER LOGGED IN");
                this.setState({loggedIn: true});
            }
            else {
                console.log(" FAILED LOGIN ");
            }
        });
    },
    componentWillUnmount() {
        ddpClient.close();
    },
    _handlePress() {
        let { email, password } = this.state;
        console.log('handle Pressed email '+email+' pass '+password);
        if (!email || !password) {
            return this.setState({error: 'Please enter all fields.'});
        }

        this.setState({email: '', password: ''}, () => {
            // this.props.navigator.pop();
            Accounts.signIn(email, password);
        });
    },
    render() {
        return (this.state.user ?
            <View style={styles.lgcontainer}>
                <Text style={styles.greyFont}> User Already logged IN </Text>
            </View>
            :
            <View style={styles.lgcontainer}>
                <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
                <View style={styles.header}>
                    <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
                </View>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                        <TextInput
                            style={[styles.input, styles.whiteFont]}
                            placeholder="Username"
                            placeholderTextColor="#FFF"
                            // value={this.state.username}
                            onChangeText={(text) => this.setState({email: text})}
                            />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                        <TextInput
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder="Pasword"
                            placeholderTextColor="#FFF"
                            onChangeText={(text) => this.setState({password: text})}
                            />
                    </View>
                    <View style={styles.forgotContainer}>
                        <Text style={styles.greyFont}>Forgot Password</Text>
                    </View>
                </View>
                <View>
                    <TouchableHighlight  style={styles.signin}
                        onPress={this._handlePress}
                        underlayColor='#99d9f4'>
                        <Text style={styles.whiteFont}>Sign In</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.signup}>
                    <Text style={styles.greyFont}>Dont have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
                </View>
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


module.exports = SignIn;
