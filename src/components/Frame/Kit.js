/* eslint-disable */

import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

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
  },
  active: {
    backgroundColor: '#F4F4F8',
    color: '#261b24'
  },
  link: {
    display: 'block',
    padding: 19,
    textDecoration: 'none',
    textAlign: 'left',
    color: '#544952',
    borderBottom: '#e9e9e9 solid 1px'
  }
};

const sections = ['Components'];

export default class Kit extends Component {

  static propTypes = {
    path: PropTypes.string
  };

  state = {
    close: !false,
    section: 'Components'
  };

  componentWillMount() {

    this.setState({
      section: this.state.section
    });

  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 72) {
        this.setState({
          close: !this.state.close
        });
      }
    });
  }

  changeSection = (section) => {

    this.setState({
      section
    });

  };

  render() {
    return (
      <div style={{ ...styles.kit, width: !this.state.close ? panelWidth : 0 }}>
        <div style={styles.sections}>
          {
            sections.map((section, key) => {
              return (
                <div key={key} style={{ ...styles.section, ...styles[(this.state.section === section) ? 'sectionActive' : ''] }} onClick={this.changeSection.bind(null, section)}>{section}</div>
              );
            })
          }
        </div>
        <div style={styles.content}>
          {
            this.props[`${this.state.section.toLowerCase()}List`].map((item, key) => {
              return (
                <Link key={key} style={{ ...styles.link, ...styles[(this.props.path === `/${this.state.section.toLowerCase()}/${item}` ? 'active' : '')] }} to={`/${this.state.section.toLowerCase()}/${item}`}>{item}</Link>
              );
            })
          }
        </div>
      </div>
    );
  }

}
