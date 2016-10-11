/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import Section from './Section';

const panelWidth = 400;

const styles = {
  kit: {
    width: panelWidth,
    zIndex: 100000000,
    position: 'fixed',
    left: 0,
    top: 0,
    background: '#E6E6EA',
    boxShadow: '2px 2px 13px -1px rgba(0,0,0,0.15)',
    height: '100%',
    fontFamily: 'Roboto',
    overflow: 'hidden',
    transition: '.5s ease'
  },
  sections: {
    width: panelWidth,
    backgroundColor: '#8D99AE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    overflow: 'auto',
    height: 'calc(100% - 44px)'
  },
  section: {
    height: '25px',
    paddingBottom: '10px',
    paddingLeft: '27px',
    paddingRight: '27px',
    paddingTop: '15px',
    cursor: 'pointer',
    color: '#ffffff'
  },
  sectionActive: {
    backgroundColor: '#2B2D42',
    color: '#ffffff'
  }
};

export default class Kit extends Component {

  static propTypes = {
    path: PropTypes.string
  };

  state = {
    close: true,
  };

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 72) {
        this.setState({
          close: !this.state.close
        });
      }
    });
  }

  render() {

    const map = {};

    this.props.componentsList.forEach((componentPath) => {

      const section = componentPath.split('/')[0];

      if (!map[section]) {
        map[section] = [];
      }

      map[section].push(componentPath.split('/').slice(1).join('/'));

    });

    return (
      <div style={{ ...styles.kit, width: !this.state.close ? panelWidth : 0 }}>
        <div style={styles.sections}>
          <div style={{ ...styles.section, ...styles.sectionActive }}>Components</div>
        </div>
        <div style={styles.content}>
          {
            Object.keys(map).map((section, key) => {
              return (
                <Section key={key} section={section} items={map[section]} path={this.props.path} />
              );
            })
          }
        </div>
      </div>
    );

  }

}
