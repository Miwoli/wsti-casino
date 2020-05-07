import * as React from 'react';
import Player from '../../classes/Player';
import Bandit from '../../classes/games/Bandit';
import { reward } from '../../helpers/interfaces/reward';
import config from '../../config.json';

export interface BanditGameProps {
  player: Player;

  moneyCallback: () => void;
}

export interface BanditGameState {
  game: Bandit;
  result: reward;
}

export class BanditGame extends React.Component<BanditGameProps, BanditGameState> {
  constructor(props: BanditGameProps) {
    super(props);

    this.state = {
      game: new Bandit(),
      result: { name: 'Nothing yet!',  reward: 0 }
    }

    this.handleStartGame = this.handleStartGame.bind(this)
  }

  handleStartGame = (event: React.FormEvent): void => {
    event.preventDefault();
    if (this.props.player.money < config.games.bandit.price) {
      console.log('Not enough money') // TODO: Handle it
      return;
    }
    this.props.player.subtractMoney(config.games.bandit.price);
    this.setState({
      result: this.state.game.play()
    });
    this.props.player.addMoney(this.state.result.reward);

    this.props.moneyCallback();
  }

  render(): JSX.Element {
    return (
      <div>
        <button onClick={ this.handleStartGame }>Play</button>
        <p>{ this.state.result.name }</p>
        <p>{ this.state.result.reward }</p>
        <p>{ this.state.game.drawed }</p>
      </div>
    )
  }
}