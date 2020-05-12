import * as React from 'react';
import Player from '../../classes/Player';
import Bandit from '../../classes/games/Bandit';
import { reward } from '../../helpers/interfaces/reward';
import config from '../../config.json';
import { Link } from 'react-router-dom';

export interface BanditGameProps {
  player: Player;

  moneyCallback: () => void;
  insufficientMoneyCallback: () => void;
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
      this.props.insufficientMoneyCallback();
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
      <>
        <p>Costs { config.games.bandit.price }</p>
        <button onClick={ this.handleStartGame }>Play</button>
        <p>{ this.state.result.name }</p>
        <p>{ this.state.result.reward }</p>
        <p>
          {
            this.state.game.drawed ?
            this.state.game.drawed.map((item, idx) =>
            (<span key={ idx }> {item} </span>)) :
            <></>
          }
        </p>
        <p>
          <Link to="/lobby/game-select">Return to game select</Link>
        </p>
      </>
    )
  }
}