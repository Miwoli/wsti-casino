export default class Game {
  bet: number;

  addBet(money: number): void {
    this.bet = money;
  }
}