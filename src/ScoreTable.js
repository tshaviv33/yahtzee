import React, { Component } from "react";
import RuleRow from "./RuleRow";
import "./ScoreTable.css";
import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
} from "./Rules";

export default class ScoreTable extends Component {
  render() {
    const { scores, doScore, totalScore } = this.props;

    return (
      <div className="ScoreTable">
        <section className="ScoreTable-section">
          <h2>Upper</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow
                name="Ones"
                score={scores.ones}
                description={ones.description}
                doScore={(event) => doScore("ones", ones.evalRoll)}
              />
              <RuleRow
                name="Twos"
                score={scores.twos}
                description={twos.description}
                doScore={(event) => doScore("twos", twos.evalRoll)}
              />
              <RuleRow
                name="Threes"
                score={scores.threes}
                description={threes.description}
                doScore={(event) => doScore("threes", threes.evalRoll)}
              />
              <RuleRow
                name="Fours"
                score={scores.fours}
                description={fours.description}
                doScore={(event) => doScore("fours", fours.evalRoll)}
              />
              <RuleRow
                name="Fives"
                score={scores.fives}
                description={fives.description}
                doScore={(event) => doScore("fives", fives.evalRoll)}
              />
              <RuleRow
                name="Sixes"
                score={scores.sixes}
                description={sixes.description}
                doScore={(event) => doScore("sixes", sixes.evalRoll)}
              />
            </tbody>
          </table>
        </section>
        <section className="ScoreTable-section ScoreTable-section-lower">
          <h2>Lower</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow
                name="Three of Kind"
                score={scores.threeOfKind}
                description={threeOfKind.description}
                doScore={(event) =>
                  doScore("threeOfKind", threeOfKind.evalRoll)
                }
              />
              <RuleRow
                name="Four of Kind"
                score={scores.fourOfKind}
                description={fourOfKind.description}
                doScore={(event) => doScore("fourOfKind", fourOfKind.evalRoll)}
              />
              <RuleRow
                name="Full House"
                score={scores.fullHouse}
                description={fullHouse.description}
                doScore={(event) => doScore("fullHouse", fullHouse.evalRoll)}
              />
              <RuleRow
                name="Small Straight"
                score={scores.smallStraight}
                description={smallStraight.description}
                doScore={(event) =>
                  doScore("smallStraight", smallStraight.evalRoll)
                }
              />
              <RuleRow
                name="Large Straight"
                score={scores.largeStraight}
                description={largeStraight.description}
                doScore={(event) =>
                  doScore("largeStraight", largeStraight.evalRoll)
                }
              />
              <RuleRow
                name="Yahtzee"
                score={scores.yahtzee}
                description={yahtzee.description}
                doScore={(event) => doScore("yahtzee", yahtzee.evalRoll)}
              />
              <RuleRow
                name="Chance"
                score={scores.chance}
                description={chance.description}
                doScore={(event) => doScore("chance", chance.evalRoll)}
              />
            </tbody>
          </table>
        </section>
        <h2>TOTAL SCORE: {totalScore()}</h2>
      </div>
    );
  }
}
