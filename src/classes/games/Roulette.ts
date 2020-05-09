import Game from '../Game';

import rouletteDictionary from '../../helpers/assets/rouletteDictrionary.json';
import { rouletteBet } from '../../helpers/interfaces/rouletteBet';
import { rouletteItem } from '../../helpers/interfaces/rouletteItem';
import { reward } from '../../helpers/interfaces/reward';

export default class Roulette extends Game {
  constructor() {
    super();
  }

  spin(): rouletteItem {
    return rouletteDictionary.numberColor[Math.floor(Math.random() * rouletteDictionary.numberColor.length)];
  }

  play(bet: rouletteBet, money: number): reward {
    const picked = this.spin();

    return (bet.numbers.includes(picked.number)) ? { name: bet.name, reward: bet.rewardMultiplier * money } : { name: 'Nothing', reward: 0 };
  }

}