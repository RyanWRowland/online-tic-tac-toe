import React, { Component } from 'react'
import './Game.css'

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: ['', '', '', 'X', 'O', '', '', '', ''],
      name: this.props.name,
      symbol: this.props.symbol,
      message: '',
      room: '',
      currentTurn: false
    }

    this.props.socket.on('newGame', data => {
      this.setState({
        message: 'Hello, ' + data.name + '. Plase ask your friend to enter Room ID: ' + data.room + '. Waiting for player 2...',
        room: data.room
      });
    });

    this.props.socket.on('player1', data => {
      this.setState({
        message: 'Hello, ' + this.state.name,
        currentTurn: true
      });
    });

    this.props.socket.on('player2', data => {
      this.setState({
        message: 'Hello, ' + data.name,
        room: data.room,
        currentTurn: false
      });
    });

    this.props.socket.on('turnPlayed', data => {
      let newBoard = [...this.state.board];
      newBoard[data.tile] = 'X';
      this.setState({
        board: newBoard
      });
    });
  }
  handleClick = (e) => {
    let index = e.target.id;
    let newBoard = [...this.state.board];
    newBoard[index] = 'X';
    this.setState({
      board: newBoard
    });
    let turnObj = {
      tile: index,
      room: this.state.room
    };
    this.props.socket.emit('playTurn', turnObj);
  }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <p>{this.state.room}</p>
        <div id="board">
          {this.state.board.map((tile, id) => {
            if (tile === 'X') {
              return (<div onClick={this.handleClick} className="tile" id={id}><i className="fas fa-times"></i></div>);
            }
            else if (tile === 'O') {
              return (<div onClick={this.handleClick} className="tile" id={id}><i className="far fa-circle"></i></div>)
            }
            else {
              return (<div onClick={this.handleClick} className="tile" id={id}></div>)
            }
          })}
        </div>
      </div>
    )
  }
}
