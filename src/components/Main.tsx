import * as React from 'react';
import { HashRouter as Router, Route, Switch, HashRouter, Link } from 'react-router-dom';
import Player from '../classes/Player';
import { LobbyForm } from './LobbyForm';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.color};
  @media(max-width: 500px){
    background-color: blue;
  }
`;


export interface MainProps {
}

export interface MainState {
  player: Player;
}

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    this.state = {
      player: new Player('', 0)
    }
  }

  lobbyFormCallback = (dataFromChild: Player): void => {
    this.setState({
      player: new Player(dataFromChild.name, dataFromChild.money)
    });
  }; 

  render(): JSX.Element {
    return (
      <>
        <HashRouter>
          <Switch>
            <Route exact path="/lobby" render={ () => (<LobbyForm player={ this.state.player } parentCallback={ this.lobbyFormCallback } />) } />
            <Route>
              <Link to="/lobby">Lobby</Link>
            </Route>
          </Switch>
        </HashRouter>
        {/* TODO: Add leaderboards and exit to router */}
        <p>{ this.state.player.name }</p>
        <p>{ this.state.player.money }</p>
      </>
    );
  }
}