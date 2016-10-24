/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router';

export const styles = {
  active: {
    backgroundColor: '#F4F4F8',
    color: '#261b24'
  },
  link: {
    display: 'block',
    padding: '10px 5px 10px 35px',
    textDecoration: 'none',
    textAlign: 'left',
    color: '#544952',
    borderBottom: '#e9e9e9 solid 1px'
  },
  section: {
    padding: 15,
    fontWeight: 'bold'
  }
};

export default class Section extends Component {
  
  render() {
    return (
      <div>
        <div style={styles.section}>{this.props.section}</div>
        {
          this.props.items.map((item, key) => {
           return (
              <Link
                key={key}
                style={{
                  ...styles.link,
                  ...styles[(this.props.path === `/components/${this.props.section}/${item}` ? 'active' : '')]
                }}
                to={`/components/${this.props.section}/${item}`}
              >
                {
                  (() => {

                    const paths = item.split('/');

                    if (paths[paths.length - 1] === paths[paths.length - 2]) {
                      return paths.slice(0, -1).join('/');
                    }

                    return item;

                  })()
                }
              </Link>
            );
          })
        }
      </div>
    );
  }

}
