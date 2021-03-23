import React, { Component } from "react";
import "./Die.css";

export default class Die extends Component {
  static defaultProps = {
    numberWords: ["one", "two", "three", "four", "five", "six"],
    val: 3,
  };

  handleClick = (event) => {
    this.props.handleClick(this.props.i);
  };

  render() {
    const { numberWords, locked, val, disabled, rolling } = this.props;
    let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x `;
    if (locked) classes += "Die-locked";
    if (rolling) classes += "Die-rolling";

    return (
      <i className={classes} onClick={this.handleClick} disabled={disabled} />
    );
  }
}
