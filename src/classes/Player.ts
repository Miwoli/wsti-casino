export default class Player {
  name: string;
  money: number;

  setName(name: string) {
    this.name = name;
  }

  setMoney(money: number) {
    this.money = money;
  }

  constructor(name: string, money: number) {
    this.name = name;
    this.money = money
  }
}