import * as React from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import Player from '../classes/Player';
import { BanditGame } from './games/BanditGame';

export interface GameSelectProps {
  player: Player;
}

export class GameSelect extends React.Component<GameSelectProps> {
  constructor(props: GameSelectProps) {
    super(props);
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route exact path="/lobby/game-select/bandit" render={ () => (<BanditGame player={ this.props.player } />) } />
          <Route>
            <Link to="/lobby/game-select/bandit">One-hand Bandit</Link>
          </Route>
        </Switch>
      </MemoryRouter>
    )
  }
}