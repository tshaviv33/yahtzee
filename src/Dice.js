import React, { Component } from "react";
import Die from "./Die";
import "./Dice.css";

export default class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((die, i) => (
          <Die
            handleClick={this.props.handleClick}
            val={die}
            locked={this.props.locked[i]}
            i={i}
            key={i}
            disabled={this.props.disabled}
            rolling={this.props.rolling && !this.props.locked[i]}
          />
        ))}
      </div>
    );
  }
}
