import * as React from 'react';
import * as fs from 'fs';
import config from '../config.json';
import { Link } from 'react-router-dom';

interface leaderboradsItem {
  name: string;
  initial: string;
  withdrawed: string;
  score: string
}

export interface LeaderboardsProps {

}

export interface LeaderboardsState {
  data: leaderboradsItem[] | null;
}

export class Leaderboards extends React.Component<LeaderboardsProps, LeaderboardsState> {
  constructor(props: LeaderboardsProps) {
    super(props);

    this.state = {
      data: null,
    }

  }

  componentDidMount(): void {

    let result = fs.readFileSync(
      config.leaderboardFile,
      'utf-8'
    );

    let tempData: leaderboradsItem[] = [];

    result.split('\n').forEach((line) => {
      let splitLine = line.split(' | ');
        tempData.push({
          name: splitLine[0],
          initial: splitLine[1],
          withdrawed: splitLine[2],
          score: splitLine[3]
        });
    })

    tempData.sort((a, b) => (parseInt(a.score) > parseInt(b.score)) ? -1 : 1);

    this.setState({
      data: tempData
    });
  }
  
  render(): JSX.Element {
    return (
      <>
        <Link to="/">Return to menu</Link>
        <table>
          <thead>
            <tr>
              <th>Player name</th>
              <th>Initial money</th>
              <th>Withdrawed money</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data ?
              this.state.data.map((item, idx) => 
              (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.initial}</td>
                  <td>{item.withdrawed}</td>
                  <td>{item.score}</td>
                </tr>
              )) : 
              <tr>
                <td>
                  No data
                </td>
              </tr>
            }
          </tbody>
        </table>
      </>
    )
  }
}