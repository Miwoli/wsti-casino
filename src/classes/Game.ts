export default class Game {
  bet: number;
  lost = 0;
  won = 0;

  addBet(money: number): void {
    this.bet = money;
  }

  looseMoney(): void {
    this.lost -= this.bet;
  }

  winMoney(money: number): void {
    this.won += money;
  }
}