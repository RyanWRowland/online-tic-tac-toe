import React, { Component } from 'react'

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      joinName: '',
      joinRoom: ''
    }
  }

  changeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  changeJoinName = (e) => {
    this.setState({
      joinName: e.target.value
    });
  }

  changeJoinRoom = (e) => {
    this.setState({
      joinRoom: e.target.value
    });
  }

  handleCreate = (e) => {
    e.preventDefault();
    if (this.state.name !== '') {
      this.props.socket.emit('createGame', { name: this.state.name });
      this.props.setPlayer(this.state.name, 'X');
      this.props.start();
    }
    else {
      alert('Please enter a username');
    }
  }

  handleJoin = (e) => {
    e.preventDefault();
    if (this.state.joinName !== '' && this.state.joinRoom !== '') {
      this.props.socket.emit('joinGame', { name: this.state.joinName, room: this.state.joinRoom });
      this.props.setPlayer(this.state.joinName, 'O');
      this.props.start();
    }
    else {
      alert('Please enter a username and room ID');
    }
  }

  render() {
    return (
      <div>
        <h1>Tic-Tac-Toe</h1>
        <h2>How To Start</h2>
        <ol>
          <li>Player 1: Create a new game by entering your username</li>
          <li>Player 2: Enter your username and the room you wish to join</li>
        </ol>
        <h3>Create a new game</h3>
        <input placeholder="Enter username" value={this.state.name} onChange={this.changeName} required />
        <button onClick={this.handleCreate}>New Game</button>
        <h3>Join an existing game</h3>
        <input placeholder="Enter username" value={this.state.joinName} onChange={this.changeJoinName} required />
        <input placeholder="Enter Room ID" value={this.state.joinRoom} onChange={this.changeJoinRoom} required />
        <button onClick={this.handleJoin}>Join Game</button>
      </div>
    )
  }
}
