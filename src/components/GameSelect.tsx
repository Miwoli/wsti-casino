import * as React from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import Player from '../classes/Player';

import { BanditGame } from './games/BanditGame';
import { BlackjackGame } from './games/BlackjackGame';
import { RouletteGame } from './games/RouletteGame';
import { Exit } from './Exit';

export interface GameSelectProps {
  player: Player;

  moneyCallback: () => void;
}

export interface GameSelectState {
  classNames: string;
}

export class GameSelect extends React.Component<GameSelectProps, GameSelectState> {
  constructor(props: GameSelectProps) {
    super(props);

    this.state = {
      classNames: ''
    }
  }

  insufficientMoney = (): void => {
    this.setState({
      classNames: 'redalert'
    });
  }

  onAnimationEnd = (): void => {
    this.setState({
      classNames: ''
    });
  }

  render(): JSX.Element {
    return (
      <>
        <div>
          <span>{ this.props.player.name } | </span>
          <span
            className={ this.state.classNames }
            onAnimationEnd={ this.onAnimationEnd }>
              { this.props.player.money }
          </span>
        </div>
        <MemoryRouter>
          <Switch>
            <Route exact path="/lobby/game-select/bandit" render={ () => (<BanditGame player={ this.props.player } moneyCallback={ this.props.moneyCallback } insufficientMoneyCallback={ this.insufficientMoney } />) } />
            <Route exact path="/lobby/game-select/blackjack" render={ () => (<BlackjackGame player={ this.props.player } moneyCallback={ this.props.moneyCallback } insufficientMoneyCallback={ this.insufficientMoney } />) } />
            <Route exact path="/lobby/game-select/roulette" render={ () => (<RouletteGame player={ this.props.player } moneyCallback={ this.props.moneyCallback } insufficientMoneyCallback={ this.insufficientMoney } />) } />
            <Route exact path="/exit" render={ () => (<Exit player={ this.props.player } />) } />
            <Route>
              <ul>
                <li>
                  <Link to="/lobby/game-select/bandit">One-hand Bandit</Link>
                </li>
                <li>
                  <Link to="/lobby/game-select/blackjack">Blackjack</Link>
                </li>
                <li>
                  <Link to="/lobby/game-select/roulette">Roulette</Link>
                </li>
                <li>
                  <Link to="/exit">Save and exit</Link>
                </li>
              </ul>
            </Route>
          </Switch>
        </MemoryRouter>
      </>
    )
  }
}