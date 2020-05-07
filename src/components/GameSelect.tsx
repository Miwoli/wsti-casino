import * as React from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import Player from '../classes/Player';
import { BanditGame } from './games/BanditGame';
import { BlackjackGame } from './games/BlackjackGame';

export interface GameSelectProps {
  player: Player;

  moneyCallback: () => void;
}

export class GameSelect extends React.Component<GameSelectProps> {
  constructor(props: GameSelectProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <span>{ this.props.player.name } | { this.props.player.money }</span>
        </div>
        <MemoryRouter>
          <Switch>
            <Route exact path="/lobby/game-select/bandit" render={ () => (<BanditGame player={ this.props.player } moneyCallback={ this.props.moneyCallback } />) } />
            <Route exact path="/lobby/game-select/blackjack" render={ () => (<BlackjackGame player={ this.props.player } moneyCallback={ this.props.moneyCallback } />) } />
            <Route>
              <ul>
                <li>
                  <Link to="/lobby/game-select/bandit">One-hand Bandit</Link>
                </li>
                <li>
                  <Link to="/lobby/game-select/blackjack">Blackjack</Link>
                </li>
              </ul>
            </Route>
          </Switch>
        </MemoryRouter>
      </>
    )
  }
}