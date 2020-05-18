import * as React from 'react';
import * as fs from 'fs';
import { remote } from 'electron';
import config from '../config.json';
import Player from '../classes/Player';

export interface ExitProps {
  player: Player;
}

export class Exit extends React.Component<ExitProps> {
  constructor(props: ExitProps) {
    super(props);

  }
  
  componentDidMount = (): void => {
    fs.appendFileSync(config.leaderboardFile, `${this.props.player.name} | ${this.props.player.initialMoney} | ${this.props.player.money} | ${this.result()} \n`, 'utf-8');
  
    remote.getCurrentWindow().close();
  }

  result = (): number => {
    return this.props.player.money - this.props.player.initialMoney;
  }

  render(): JSX.Element {
    return <p>Saving...</p>
  }
}