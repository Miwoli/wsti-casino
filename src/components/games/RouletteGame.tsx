import * as React from 'react';
// TODO: Add Roulette once it's implemented
import Player from '../../classes/Player';
import { reward } from '../../helpers/interfaces/reward';

export interface RouletteGameProps {
  player: Player;

  moneyCallback: () => void;
}

export interface RouletteGameState {
  result: reward;
}

export class RouletteGame extends React.Component<RouletteGameProps, RouletteGameState> {
  constructor(props: RouletteGameProps) {
    super(props);

    this.state = {
      result: { reward: 0, name: 'Nothing' }
    }
  }

  // TODO: IDEA: Select/Dropdown/Radio buttons to select bet type
  render(): JSX.Element {
    return (
      <h1>Roulette</h1>
    )
  }
}