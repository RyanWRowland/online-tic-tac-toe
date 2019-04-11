import React, { Component } from 'react';
import io from 'socket.io-client';
import Menu from './components/Menu';
import Game from './components/Game';

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      symbol: '',
      started: false
    }

    this.socket = io('localhost:5000');
  }

  setPlayer = (name, symbol) => {
    this.setState({
      name: name,
      symbol: symbol
    });
  }

  startGame = () => {
    this.setState({
      started: true
    });
  }

  render() {
    if (this.state.started) {
      return (
        <Game socket={this.socket} name={this.state.name} symbol={this.state.symbol} />
      );
    }
    return (
      <Menu start={this.startGame} socket={this.socket} setPlayer={this.setPlayer} />
    );
  }
}

export default App;
