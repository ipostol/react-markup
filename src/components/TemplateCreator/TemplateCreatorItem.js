/* eslint-disable */

import React, { PropTypes } from 'react';
import Skin from '../Skin';
import { TextField, RaisedButton, Toggle } from 'material-ui';

export default class TemplateCreatorItem extends React.Component {

  static propTypes = {
    component: PropTypes.any,
    props: PropTypes.object,
    remove: PropTypes.func,
    style: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: props.props
    };
  }

  changeField(field, e) {

    let value = typeof e !== 'object' ? e : e.target.value;

    if (value === 'undefined') {
      value = undefined;
    } else if (value !== '') {

      try {

        switch (typeof this.props.props[field]) {

          case 'function':
            value = new Function(value);
            break;
          case 'object':
            value = JSON.parse(value);
            break;
          case 'number':
            value = isNaN(parseFloat(value)) ? '' : parseFloat(value);
            break;

        }

      } catch (_) {}

    }

    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value
      }
    });

  }

  checkField(field) {

    if (typeof field === 'function') {
      return field.toString().split('\n')
      .slice(1)
      .slice(0, -1)
      .join('\n');
    }

    if (typeof field === 'object') {
      return JSON.stringify(field);
    }

    return field;

  }

  checkFields() {

    const fields = [];

    for (const field in this.state.fields) { // eslint-disable-line guard-for-in
      fields.push(
        typeof this.props.props[field] === 'boolean' ?
        <Toggle
          key={field}
          label={`${field}: `}
          toggled={this.state.fields[field]}
          onToggle={(_, value) => this.changeField(field, value)}
        /> :
        <TextField
          key={field}
          hintText={field}
          multiLine
          rows={1}
          floatingLabelText={field}
          value={this.checkField(this.state.fields[field]) + ''}
          onChange={this.changeField.bind(this, field)}
        />
      );
      fields.push(<br key={field + 1} />);
    }

    return fields;

  }

  checkChildrenHTML() {

    if (/^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/.test(this.state.fields.children)) {
      return <span dangerouslySetInnerHTML={{ __html: this.state.fields.children }} />;
    }

    return this.state.fields.children;

  }

  render() {

    const Component = this.props.component;

    return (
      <Skin style={{width: 500, ...this.props.style}}>
        {
          this.checkFields()
        }
        <br />
        <Component {...this.state.fields} children={this.checkChildrenHTML()} />
        <br />
        <hr />
        <RaisedButton label="Delete" secondary onClick={this.props.remove} />
      </Skin>
    );

  }

}
