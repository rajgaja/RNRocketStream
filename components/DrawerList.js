'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;
var DrawerBase = require('./DrawerBase');

var COMPONENTS = [
  // require('./ListViewExample'),
];

type Props = {
  onSelectExample: Function,
  isInDrawer: bool,
};

class DrawerList extends React.Component {
  props: Props;

  render() {
    return (
      <DrawerBase
        components={COMPONENTS}
        searchText=""
        renderAdditionalView={this.renderAdditionalView.bind(this)}
        onPressRow={this.onPressRow.bind(this)}
      />
    );
  }

  renderAdditionalView(renderRow, renderTextInput): React.Component {
    if (this.props.isInDrawer) {
      var homePage = renderRow({
        title: 'Y0Spam',
        description: '',
      }, -1);
      return (
        <View>
          {homePage}
        </View>
      );
    }
    return renderTextInput(styles.searchTextInput);
  }

  onPressRow(example: any) {
    var Component = DrawerBase.makeRenderable(example);
    this.props.onSelectExample({
      title: Component.title,
      component: Component,
    });
  }
}

var styles = StyleSheet.create({
  searchTextInput: {
    padding: 2,
  },
});

module.exports = DrawerList;
