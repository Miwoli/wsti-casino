import * as React from 'react';
import { Route, Redirect, Switch, MemoryRouter } from 'react-router-dom';
import Player from '../classes/Player';
import { GameSelect } from './GameSelect';

export interface LobbyFormProps {
  parentCallback: (data: Player) => void;

  player: Player;
}

export interface LobbyFormState {
  formSent: boolean;
}

export class LobbyForm extends React.Component<LobbyFormProps, LobbyFormState> {
  constructor(props: LobbyFormProps) {
    super(props);

    this.state = {
      formSent: false
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMoneyChange = this.handleMoneyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.parentCallback(this.props.player);
    this.setState({
      formSent: true
    });
  };

  handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.player.name = event.currentTarget.value;
  };

  handleMoneyChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.player.money = parseFloat(event.currentTarget.value);
  }

  render(): JSX.Element {
    return (
      <MemoryRouter>
        <Switch>
          {/* <Route exact path="/lobby/game-select" render={ () => (<GameSelect />)} /> */}
          <Route exact path="/lobby/game-select" render={ () => (<GameSelect player={ this.props.player }/>)} />
          <Route>
            {
              this.state.formSent &&
                <Redirect to="/lobby/game-select" />
            }
            <form onSubmit={ this.handleSubmit }>
              <button type="submit">Save</button>
              <input onChange={ this.handleNameChange } type="text"></input>
              <input onChange={ this.handleMoneyChange } type="number"></input>
            </form>
          </Route>
        </Switch>
        </MemoryRouter>        
    )
  }
}