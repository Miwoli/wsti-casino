import * as React from 'react';
import Player from '../classes/Player';

export interface LobbyFormProps {
  parentCallback: (data: Player) => void;

  player: Player;
}

export class LobbyForm extends React.Component<LobbyFormProps> {
  constructor(props: LobbyFormProps) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMoneyChange = this.handleMoneyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent){
    event.preventDefault();
    this.props.parentCallback(this.props.player);
  };

  handleNameChange(event: React.FormEvent<HTMLInputElement>) {
    this.props.player.name = event.currentTarget.value;
  };

  handleMoneyChange(event: React.FormEvent<HTMLInputElement>) {
    this.props.player.money = parseFloat(event.currentTarget.value);
  }

  render(): JSX.Element {
    return (
      <form onSubmit={ this.handleSubmit }>
        <button type="submit">Save</button>
        <input onChange={ this.handleNameChange } type="text"></input>
        <input onChange={ this.handleMoneyChange } type="number"></input>
      </form>
    )
  }
}