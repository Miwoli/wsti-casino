import * as React from 'react';
import { DynamicSelect } from '../shared/DynamicSelect';
// TODO: Add Roulette once it's implemented
import Player from '../../classes/Player';
import { reward } from '../../helpers/interfaces/reward';
import RouletteBets from '../../helpers/assets/rouletteBets.json';
import Roulette from '../../classes/games/Roulette';
import { rouletteBet } from '../../helpers/interfaces/rouletteBet';

export interface RouletteGameProps {
  player: Player;

  moneyCallback: () => void;
}

export interface RouletteGameState {
  result: reward;
  betType: number;
  betId: number;
  bet: number;
  started: boolean;
  numberOne: number;
  numberTwo: number;
  numberThree: number;

  game: Roulette;
}

export class RouletteGame extends React.Component<RouletteGameProps, RouletteGameState> {
  constructor(props: RouletteGameProps) {
    super(props);

    this.state = {
      result: { reward: 0, name: 'Nothing' },
      betType: 0,
      betId: 0,
      bet: 0,
      started: false,
      numberOne: -1,
      numberTwo: -1,
      numberThree: -1,
      game: new Roulette
    }

    this.handleStartGame = this.handleStartGame.bind(this);
  }

  handleStartGame = (event: React.FormEvent): void => {
    event.preventDefault();
    if (this.props.player.money < this.state.bet) {
      console.log('Not enough money');
      return
    };
    this.props.player.subtractMoney(this.state.bet);
    this.setState({
      started: true
    });
    this.forceUpdate();
    this.props.moneyCallback();
  }

  handleBetChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      bet: parseFloat(event.currentTarget.value)
    })
  }

  handleBetTypeChange = (selectedValue: string) => {
    let value = parseInt(selectedValue);
    this.setState({
      betType: value
    });
  }

  handleBetGroupChange = (selectedValue: string) => {
    let value = parseInt(selectedValue);
    this.setState({
      betId: value
    });
  }

  handleBetSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let bet: rouletteBet;

    if (this.state.betType === 100) {
      let betTemp = RouletteBets.type[0].options.find(item => item.id === this.state.betId);
      if (this.state.betId === 1) {
        betTemp.numbers = [this.state.numberOne];
      }

      if (this.state.betId === 2) {
        betTemp.numbers = [this.state.numberOne, this.state.numberTwo];
      }

      if (this.state.betId === 3) {
        betTemp.numbers = [this.state.numberOne, this.state.numberTwo, this.state.numberThree];
      }

      bet = betTemp;
    }

    if (this.state.betType === 200) {
      bet = RouletteBets.type[1].options.find(item => item.id == this.state.betId);
    }

    const result = this.state.game.play(bet, this.state.bet);

    this.setState({
      result: result
    });

    this.props.player.addMoney(result.reward);
    this.props.moneyCallback();
        
  }

  handleNumerOneChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      numberOne: parseInt(event.currentTarget.value)
    });
  }

  handleNumerTwoChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      numberTwo: parseInt(event.currentTarget.value)
    });
  }

  handleNumerThreeChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      numberThree: parseInt(event.currentTarget.value)
    });
  }

  render(): JSX.Element {
    let betSelect = <p>Select bet type</p>;

    if (this.state.betType === 100) {
      betSelect = <DynamicSelect data={ RouletteBets.type[0].options } onSelectChange={ this.handleBetGroupChange } />
    }

    if (this.state.betType === 200) {
      betSelect = <DynamicSelect data={ RouletteBets.type[1].options } onSelectChange={ this.handleBetGroupChange } />
    }

    let numbers = <></>

    const submit = <button type="submit">Place a bet</button>

    if (this.state.betId === 1) {
      numbers = <>
        <input type="number" max="36" min="0" name="one" />
        { submit }
      </>
    }
    if (this.state.betId === 2) {
      numbers = <>
        <input type="number" max="36" min="0" name="one" />
        <input type="number" max="36" min="0" name="two" />
        { submit }
      </>
    }
    if (this.state.betId === 3) {
      numbers = <>
        <input type="number" max="36" min="0" name="one" required />
        <input type="number" max="36" min="0" name="two" required />
        <input type="number" max="36" min="0" name="three" required />
        { submit }
      </>
    }

    const startForm = (
      <form onSubmit={ this.handleStartGame }>
        <input onChange={ this.handleBetChange } type="number" />
        <button type="submit">Start</button>
      </form>
    )

    const controls = (
      <form onSubmit={ this.handleBetSubmit }>
        <DynamicSelect data={ RouletteBets.type } onSelectChange={ this.handleBetTypeChange } />
        { betSelect }
        { this.state.betType === 100 ? numbers : <></> }
        { this.state.betType === 200 ? submit : <></> }
      </form>
    )

    return (
      <>
        { !this.state.started ? startForm : controls }
        { this.state.game.pickedNumber ? <p>Ball landed on: { this.state.game.pickedNumber }</p> : <></>}
        { this.state.result.name }
      </>
    )
  }
}