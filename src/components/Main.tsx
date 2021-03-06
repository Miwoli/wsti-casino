import * as React from 'react';
import { Route, Switch, Link, MemoryRouter } from 'react-router-dom';
import Player from '../classes/Player';
import { LobbyForm } from './LobbyForm';
import { Leaderboards } from './Leaderboards';

export interface MainProps {
}

export interface MainState {
  player: Player;
}

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    this.state = {
      player: new Player('')
    }
  }

  lobbyFormCallback = (dataFromChild: Player): void => {
    this.setState({
      player: new Player(dataFromChild.name)
    });
  };

  moneyChangeCallback = (): void => {
    this.setState({
      player: this.state.player
    });
  };

  render(): JSX.Element {
    return (
      <>
        <MemoryRouter>
          <Switch>
            <Route exact path="/lobby" render={ () => (<LobbyForm player={ this.state.player } parentCallback={ this.lobbyFormCallback } moneyCallback={ this.moneyChangeCallback } />) } />
            <Route exact path="/leaderboards" render={ () => (<Leaderboards />) } />
            <Route>
              <ul>
                <li>
                  <Link to="/lobby">Lobby</Link>
                </li>
                <li>
                  <Link to="/leaderboards">Leaderboards</Link>
                </li>
              </ul>
            </Route>
          </Switch>
        </MemoryRouter>
      </>
    );
  }
}