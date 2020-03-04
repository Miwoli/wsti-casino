import Game from "../Game";

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
  ] // TODO: Extract to config file

}