import config from '../config.json';

export default class Player {
  name: string;
  money: number;
  initialMoney: number;

  setName(name: string) {
    this.name = name;
  }

  setMoney(money: number) {
    this.money = money;
  }

  addMoney(money: number) {
    this.money += money;
  }

  subtractMoney(money: number) {
    this.money -= money;
  }

  generateRandomMoney() {
    this.money = Math.floor(Math.random() * (config.player.initialMoneyRange[1] - config.player.initialMoneyRange[0] + 1)) + config.player.initialMoneyRange[0];
    this.initialMoney = this.money;
  }

  constructor(name: string) {
    this.name = name;
    this.generateRandomMoney();
  }
}