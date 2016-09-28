/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import { removeIndexFromArray } from '../../helpers/utils';
import TemplateCreatorItem from './TemplateCreatorItem';
import { RaisedButton } from 'material-ui';

export default class TemplateCreator extends Component {

  static propTypes = {
    component: PropTypes.any,
    style: PropTypes.object
  };

  state = {
    components: []
  };

  add = () => {
    this.setState({
      components: this.state.components.concat([this.props.component.defaultProps])
    });
  };

  remove = (index) => {
    this.setState({
      components: removeIndexFromArray(this.state.components, index)
    });
  };

  render() {

    const { component, style } = this.props;

    return (
      <div>
        {
          this.state.components.map((_, key) => {
            return (
              <TemplateCreatorItem key={key} props={component.defaultProps} component={component} remove={this.remove.bind(this, key)} style={style} />
            );
          })
        }
        <hr />
        <RaisedButton label="Add component" primary onClick={this.add} />
      </div>
    );

  }


}
