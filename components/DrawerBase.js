'use strict';

var React = require('react-native');
var {
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
});

class DrawerBase extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({
        components: [],
        apis: [],
      }),
      searchText: this.props.searchText,
    };
  }

  componentDidMount(): void {
    this.search(this.state.searchText);
  }

  render() {
    var topView = this.props.renderAdditionalView &&
      this.props.renderAdditionalView(this.renderRow.bind(this));

    return (
      <View style={styles.listContainer}>
        {topView}
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
          keyboardShouldPersistTaps={true}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
        />
      </View>
    );
  }

  _renderSectionHeader(data: any, section: string) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>
          {section.toUpperCase()}
        </Text>
      </View>
    );
  }

  renderRow(example: any, i: number) {
    return (
      <View key={i}>
        <TouchableHighlight onPress={() => this.onPressRow(example)}>
          <View style={styles.row}>
            <Text style={styles.rowTitleText}>
              {example.title}
            </Text>
            <Text style={styles.rowDetailText}>
              {example.description}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  }

  search(text: mixed): void {
    this.props.search && this.props.search(text);

    var regex = new RegExp(text, 'i');
    var filter = (component) => regex.test(component.title);

    this.setState({
      dataSource: ds.cloneWithRowsAndSections({
        components: this.props.components.filter(filter),
      }),
      searchText: text,
    });
  }

  onPressRow(example: any): void {
    this.props.onPressRow && this.props.onPressRow(example);
  }

  static makeRenderable(example: any): ReactClass<any, any, any> {
    return  example;
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: 'lightblue',
  },
  sectionHeader: {
    padding: 5,
  },
  group: {
    backgroundColor: 'white',
  },
  sectionHeaderTitle: {
    fontWeight: '500',
    fontSize: 11,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '500',
  },
  
});

module.exports = DrawerBase;
