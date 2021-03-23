import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;
const NUM_ROUNDS = 13;

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      roundsLeft: NUM_ROUNDS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    };
  }

  componentDidMount() {
    this.animateRoll();
  }

  animateRoll = () => {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  };

  roll = (event) => {
    this.setState((oldState) => ({
      dice: oldState.dice.map((die, i) =>
        oldState.locked[i] ? die : Math.ceil(Math.random() * 6)
      ),
      locked:
        oldState.rollsLeft > 1 ? oldState.locked : Array(NUM_DICE).fill(true),
      rollsLeft: oldState.rollsLeft - 1,
      rolling: false,
    }));
  };

  toggleLocked = (i) => {
    if (this.state.rollsLeft > 0 && !this.state.rolling) {
      this.setState((oldState) => ({
        locked: [
          ...oldState.locked.slice(0, i),
          !oldState.locked[i],
          ...oldState.locked.slice(i + 1),
        ],
      }));
    }
  };

  doScore = (rulename, ruleFunc) => {
    this.setState((oldState) => ({
      scores: { ...oldState.scores, [rulename]: ruleFunc(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
      roundsLeft: oldState.roundsLeft - 1,
    }));
    this.animateRoll();
  };

  getTotalScore = () => {
    const { scores } = this.state;
    let totalScore = 0;
    for (let key in scores) {
      if (scores[key]) totalScore += scores[key];
    }
    return totalScore;
  };

  newGame = (event) => {
    this.setState({
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      roundsLeft: NUM_ROUNDS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    });
    this.animateRoll();
  };

  displayRollInfo = () => {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Rolling...",
    ];
    return messages[this.state.rollsLeft];
  };

  render() {
    const { dice, locked, rollsLeft, rolling, scores, roundsLeft } = this.state;

    let header = null;
    if (roundsLeft === 0) {
      header = (
        <header className="Game-header">
          <h1 className="App-title-gameover">Yahtzee!</h1>
          <h2 className="App-title-gameover-h2">Game Over!</h2>
          <h2 className="Game-scores">YOUR SCORE: {this.getTotalScore()}</h2>
          <button className="Game-reroll" onClick={this.newGame}>
            New Game
          </button>
        </header>
      );
    } else {
      header = (
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>
          <section className="Game-dice-section">
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
              disabled={rollsLeft === 0}
              rolling={rolling}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={locked.every((x) => x) || rollsLeft === 0 || rolling}
                onClick={this.animateRoll}
              >
                {this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
      );
    }

    return (
      <div className="Game">
        {header}
        <ScoreTable
          doScore={this.doScore}
          scores={scores}
          totalScore={this.getTotalScore}
        />
      </div>
    );
  }
}
