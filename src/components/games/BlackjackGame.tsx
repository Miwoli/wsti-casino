import * as React from 'react';
import Blackjack from '../../classes/games/Blackjack';
import Player from '../../classes/Player';
import { reward } from '../../helpers/interfaces/reward';

export interface BlackjackGameProps {
  player: Player;

  moneyCallback: () => void;
}

export interface BlackjackGameState {
  game: Blackjack;
  started: boolean;
  bet: number;
  result: reward;
}

export class BlackjackGame extends React.Component<BlackjackGameProps, BlackjackGameState> {
  constructor(props: BlackjackGameProps) {
    super(props);

    this.state = {
      game: new Blackjack(),
      started: false,
      bet: 0,
      result: { reward: 0, name: 'Nothing' }
    }

    this.handleStartGame = this.handleStartGame.bind(this);
  }

  handleBetChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      bet: parseFloat(event.currentTarget.value)
    })
  }

  handleStartGame = (event: React.FormEvent): void => {
    event.preventDefault();
    if (this.props.player.money < this.state.bet) {
      console.log('Not enough money'); // TODO: Handle it
      return;
    };
    this.state.game.start(this.state.bet);
    this.props.player.subtractMoney(this.state.bet);
    this.setState({
      started: true
    })
    this.forceUpdate();
    this.props.moneyCallback();
    if (this.state.game.playerHand.total === 21) {
      this.stand(true);
    }
  }

  hit = (): void => {
    this.state.game.hit();
    this.forceUpdate();
  }

  handleStand = (): void => {
    this.stand();
  }

  stand = async (natural?: boolean): Promise<void> => {
    await this.setState({
      result: this.state.game.stand(natural),
      started: false
    });
    this.props.player.addMoney(this.state.result.reward);
    this.props.moneyCallback();
    this.state.game.reset();
  }

  render(): JSX.Element {

    let playerCards = this.state.game.playerHand.cards ?
      this.state.game.playerHand.cards.map((card, idx) => {
        return <li key={ idx }>{ card.symbol } | { card.value }</li>
      }) :
      <li>Player hand's empty</li>

    let houseCards = this.state.game.houseHand.cards ? 
      this.state.game.houseHand.cards.map((card, idx) => {
        return <li key={ idx }>{ card.symbol } | { card.value }</li>
      }) :
      <li>House hand's empty</li>

    const startForm = (
      <form onSubmit={ this.handleStartGame }>
        <input onChange={ this.handleBetChange } type="number" />
        <button type="submit">Start</button>
      </form>
    )

    const controls = (
      <>
        <button onClick={ this.hit }>Hit</button>
        <button onClick={ this.handleStand }>Stand</button>
      </>
    )

    return (
      <>
        { !this.state.started ? startForm : controls }
        <p>Player: { this.state.game.playerHand.total }</p>
        { playerCards }
        <p>House: { this.state.game.houseHand.total }</p>
        { houseCards }
      </>
    ) 
  }
}