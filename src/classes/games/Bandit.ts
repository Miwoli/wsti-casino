import Game from '../Game';
import * as _ from 'lodash';
import { reward } from '../../helpers/interfaces/reward';

export default class Bandit extends Game {
  symbols = [
    'diamond',
    'spade',
    'heart',
    'club',
    'jack',
    'queen',
    'king',
    'ace'
  ];

  combinations = [
    {
      'name': 'Three of diamonds',
      'symbols': [
        'diamond',
        'diamond',
        'diamond'
      ],
      'reward': 10
    },
    {
      'name': 'Three of spades',
      'symbols': [
        'spade',
        'spade',
        'spade'
      ],
      'reward': 10
    },
    {
      'name': 'Three of hearts',
      'symbols': [
        'heart',
        'heart',
        'heart'
      ],
      'reward': 10
    },
    {
      'name': 'Three of clubs',
      'symbols': [
        'club',
        'club',
        'club'
      ],
      'reward': 10
    },
    {
      'name': 'Three of jacks',
      'symbols': [
        'jack',
        'jack',
        'jack'
      ],
      'reward': 20
    },
    {
      'name': 'Three of queens',
      'symbols': [
        'queen',
        'queen',
        'queen'
      ],
      'reward': 50
    },
    {
      'name': 'Three of kings',
      'symbols': [
        'king',
        'king',
        'king'
      ],
      'reward': 100
    },
    {
      'name': 'The Royal Family',
      'symbols': [
        'jack',
        'queen',
        'king'
      ],
      'reward': 500
    },
    {
      'name': 'ACE ACE ACE',
      'symbols': [
        'ace',
        'ace',
        'ace'
      ],
      'reward': 1000
    }
  ];

  drawed: string[];

  draw(): void {
    let temp = [];
    for (let i = 0; i < 3; i++) {
      temp.push(this.symbols[Math.floor(Math.random() * this.symbols.length)]);
    };
    this.drawed = temp;
  }

  play(): reward {
    this.draw()
    const win = this.combinations.find(item => {
      return _.isEqual(item.symbols, this.drawed)
    });

    return win ? win : { name: 'Nothing', reward: 0 };
  }

}