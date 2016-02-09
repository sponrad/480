import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}

class World extends React.Component {
  render() {
    return <h1>World</h1>
  }
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));
ReactDOM.render(<World/>, document.getElementById('world'));
